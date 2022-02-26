<template>
  <div>
    <div class="ma-4">
      <v-breadcrumbs color="indigo--text" class="pa-0" :items="titles" large></v-breadcrumbs>
    </div>
    <div class="d-flex user-select-none">
      <v-container :class="sidePanelState == 'open' ? 'openedPanel' : ''" fluid class="pa-0 taskswrapper">
        <v-row class="ma-0">

          <!-- open column -->
          <v-col class="pa-0">
            <v-card elevation="1" class="mx-auto ma-2 d-flex flex-column" min-height="550" min-width="250" max-width="400">
              <div class='text-center light-blue lighten-5 cardHead d-flex align-center justify-space-between px-4'>
                <span class="primaryColor fsize14">Open ({{totalTasks.length}})</span>
                <v-icon color="light-blue" @click="addTask">mdi-plus-circle</v-icon>
              </div>
              <div class="overflow-y-auto h-550 allTasks">
                <div class="pa-3">
                  <draggable :group="{ name: 'people', put: true }" :list="totalTasks" @start="drag = true" @end="drag = false" v-bind="dragOptions">
                    <v-card :ripple="false" @click="updateTask(t)" min-height="76" class="pa-2 my-2 taskCard rounded-lg" v-for="(t,index) in totalTasks" :key="index">
                      <div class="d-flex justify-space-between">
                        <div class="secondaryColor fsize14">
                          {{t.task_name}}
                        </div>
                        <v-btn min-width="86" height="26" depressed rounded :color="t.priority == 'Low' ? 'teal lighten-4' : t.priority == 'Medium' ? 'amber lighten-4' : t.priority == 'High' ? 'red lighten-4' : 'grey'" class="text-capitalize mx-1 fsize12">{{t.priority}}</v-btn>
                      </div>
                      <v-menu v-model="duePicker[index]" :close-on-content-click="false" transition="scale-transition" offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon v-bind="attrs" v-on="on">mdi-calendar-clock-outline</v-icon>
                        </template>
                        <v-date-picker v-model="dueDate[index]" :show-current="true" no-title @input="duePicker[index] = false"></v-date-picker>
                      </v-menu>
                    </v-card>
                  </draggable>
                </div>
              </div>
            </v-card>
          </v-col>

          <!-- In progress column -->
          <v-col class="pa-0">
            <v-card elevation="1" class="mx-auto ma-2 d-flex flex-column" min-height="550" min-width="250" max-width="400">
              <div class='text-center deep-orange lighten-5 cardHead d-flex align-center justify-space-between px-4'>
                <span class="primaryColor fsize14">In Progress ({{currentUserTasks.length}})</span>
                <v-icon color="light-blue" @click="addTask">mdi-plus-circle</v-icon>
              </div>
              <div class="overflow-y-auto h-550">
                <div class="pa-3">
                  <draggable :group="{ name: 'people', put: true }" :list="currentUserTasks" @start="drag = true" @end="drag = false" v-bind="dragOptions">
                    <v-card :ripple="false" @click="updateTask(t)" min-height="76" class="pa-2 my-2 taskCard" v-for="(t,tidx) in currentUserTasks" :key="tidx">
                      <div class="d-flex justify-space-between">
                        <div class="secondaryColor fsize14">
                          {{t.task_name}}
                        </div>
                        <v-btn min-width="86" height="26" depressed rounded :color="t.priority == 'Low' ? 'teal lighten-4' : t.priority == 'Medium' ? 'amber lighten-4' : t.priority == 'High' ? 'red lighten-4' : 'grey'" class="text-capitalize mx-1 fsize12">{{t.priority}}</v-btn>
                      </div>
                    </v-card>
                  </draggable>
                </div>
              </div>
            </v-card>
          </v-col>

          <!-- completed column -->
          <v-col class="pa-0">
            <v-card elevation="1" class="mx-auto ma-2 d-flex flex-column" min-height="550" min-width="250" max-width="400">
              <div class='text-center teal lighten-5 cardHead d-flex align-center justify-space-between px-4'>
                <span class="primaryColor fsize14">Completed ({{currentUserTasks.length}})</span>
                <v-icon color="light-blue" @click="addTask">mdi-plus-circle</v-icon>
              </div>
              <div class="overflow-y-auto h-550">
                <div class="pa-3">
                  <draggable :list="currentUserTasks" v-bind="dragOptions">
                    <v-card :ripple="false" @click="updateTask(t)" min-height="76" class="pa-2 my-2 taskCard" v-for="(t,tidx) in currentUserTasks" :key="tidx">
                      <div class="d-flex justify-space-between">
                        <div class="secondaryColor fsize14">
                          {{t.task_name}}
                        </div>
                        <v-btn min-width="86" height="26" depressed rounded :color="t.priority == 'Low' ? 'teal lighten-4' : t.priority == 'Medium' ? 'amber lighten-4' : t.priority == 'High' ? 'red lighten-4' : 'grey'" class="text-capitalize mx-1 fsize12">{{t.priority}}</v-btn>
                      </div>
                    </v-card>
                  </draggable>
                </div>
              </div>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
      <div>
        <updatePanel v-if="sidePanelState == 'open'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs",
];
export default {
  name: "kanbanBoard",
  data: () => ({
    title: "Kanban Board",
    titles: [
      { text: "Tasks", disabled: false, href: "task1" },
      { text: "Board", disabled: false, href: "kanbanBoard" },
    ],
    drag: false,
    displayer: message.map((name, index) => {
      return { name, order: index + 1 };
    }),
  }),
  components: {
    draggable,
    updatePanel: () => import("../views/sidePanelDrawer.vue"),
  },
  computed: {
    ...mapGetters("task", {
      totalTasks: "getAllTasks",
      currentUserTasks: "getCurrentUserTaks",
      currentTasks: "getCurrentTasks",
    }),
    ...mapGetters({ loader: "getLoader" }),
    ...mapGetters("project", { projectList: "getProjectsList" }),
    ...mapGetters("employee", { employeeList: "getEmployeeList" }),
    ...mapGetters({ sidePanelState: "getUpdateTaskPanel" }),
    dragOptions() {
      return {
        animation: 300,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    addTask() {},
    addColumn() {},
    updateTask(task) {
      this.$store.commit("setUpdateTaskPanel", "open");
      this.$store.commit("setCurrentTask", task);
    },
  },
  created() {
    this.$store.dispatch("task/getTasks");
  },
};
</script>

<style>
.cardHead {
  background: #f5f5f5;
  min-height: 40px;
}
.taskCard {
  background: #f8f8f8 !important;
  box-shadow: inset 0 0 0 1px #f4f6ff !important;
  border: 1px solid #d3d2d2 !important;
}
.h-550 {
  height: 550px;
}
</style>
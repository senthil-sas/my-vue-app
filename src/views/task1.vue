<template>
  <div class="user-select-none">
    <div class="mx-4 mt-4 d-flex">
      <v-breadcrumbs color="indigo--text" class="pa-0" :items="titles" large></v-breadcrumbs>
      <v-spacer></v-spacer>
      <v-radio-group v-model="taskSwitch" row dense>
        <v-radio label="All Task" value="all" hide-details></v-radio>
        <v-radio label="My Task" value="user" hide-details></v-radio>
      </v-radio-group>
      <div class="d-flex align-center">
        <v-btn depressed color="light-blue" class="white--text text-capitalize">
          <v-icon color="white" left>mdi-sort</v-icon>
          Sort
        </v-btn>
      </div>
    </div>
    <v-container fluid class="d-flex">

      <!-- tasks sheet -->
      <div :class="sidePanelState == 'open' ? 'openedPanel' : ''" class="taskswrapper">
        <v-card class="my-2 addtask align-center d-flex pl-4" height="56">
          <div @keypress.enter="createTask" class="w-100">
            <div :data-state="state" class="d-flex align-center">
              <v-icon color="grey" left>mdi-plus</v-icon>
              <input type="text" class="addTaskInput" v-model="addTaskInput" autofocus placeholder="Add a task" @click="state = 'open'" @blur="state='close'" />
              <v-btn @click="createTask" depressed color="light-blue white--text" height="40" width="100" class="text-capitalize ml-4">Add</v-btn>
            </div>
          </div>
        </v-card>
        <div class="calcHeight">
          <v-card :ripple="false" @click="updateTask(i)" class="my-1 tasksheet align-center d-flex pl-4" height="56" v-for="(i,idx) in currentTasks" :key='idx'>
            <v-layout align-center>
            <v-flex wrap xs4 ><span class="fsize14">{{i.task_name}}</span></v-flex>
            <v-flex xs3>
              <span class="fsize12 secondaryColor">{{i.assigned_to_name}}</span>
            </v-flex>
            <v-flex xs3>
              <span class="fsize12 secondaryColor">{{i.task_status}}</span>
            </v-flex>
            <v-flex xs3><v-btn min-width="86" depressed rounded height="26" :color="i.priority == 'Low' ? 'teal lighten-4' : i.priority == 'Medium' ? 'amber lighten-4' : i.priority == 'High' ? 'red lighten-4' : 'grey'"
            class="fsize12 text-capitalize" >{{i.priority}}</v-btn></v-flex>
             </v-layout>
             <v-flex xs3>
               <span class="fsize12 secondaryColor">{{i.end_date}}</span>
             </v-flex>
          </v-card>
        </div>
      </div>

      <!-- update panel -->
      <transition :duration="550" name="fade">
        <updatePanel v-if="sidePanelState == 'open'" class="resizeClass" />
      </transition>
    </v-container>
  </div>
</template>

<script>
import updatePanel from "../views/sidePanelDrawer.vue";
import { mapGetters } from "vuex";
export default {
  name: "Task",
  data: () => ({
    titles: [
      { text: "Tasks", disabled: false, href: "task1" },
      { text: "Board", disabled: false, href: "kanbanBoard" },
    ],
    state: "close",
    addTaskInput: "",
    taskSwitch: 'user',
    dueDate1:'',
    dueDatePicker1: false,
  }),
  components: { updatePanel },
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
  },
  methods: {
    updateTask(task) {
      this.$store.commit("setUpdateTaskPanel", "open");
      this.$store.commit("setCurrentTask", task);
    },
    createTask() {
      this.$toast.success(`Task created successfully. (${this.addTaskInput})`, {
        position: "bottom-center",
        timeout: 1500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      this.addTaskInput = "";
    },
  },
  watch: {
    taskSwitch(val) {
      this.$store.commit(
        "task/setCurrentTaks",
        val == 'all' ? this.totalTasks : this.currentUserTasks
      );
    },
  },
  created() {
    this.$store.dispatch("task/getTasks");
  },
};
</script>

<style>
.tasksheet {
  background: #f4f6ff !important;
  box-shadow: inset 0 0 0 1px #f4f6ff !important;
  border: 1px solid #d2daff !important;
}
.addtask {
  box-shadow: 0 17px 0 -16px #e5e5e5 !important;
  background-color: #f5f5f5 !important;
  padding: 0 0.8rem !important;
  margin: 0px !important;
  border: 1px solid #e5e5e5 !important;
}
.tasksheet:hover {
  background-color: #f5f5f5 !important;
}
.calcHeight {
  height: calc(100vh - 240px);
  overflow-y: auto;
}
.addTaskInput {
  height: 40px;
  width: 100% !important;
  background-color: #ffffff !important;
  text-indent: 10px;
}
.addTaskInput:focus {
  outline: 1px solid #0981f1;
  border-radius: 4px !important;
}
.openedPanel .taskswrapper {
  width: calc(100% - 400px);
}
.taskswrapper {
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
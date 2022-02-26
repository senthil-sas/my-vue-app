<template>
  <div>
    <!-- update Panel -->
    <!-- <v-container fluid class="pa-0">
      <v-card class="mx-2 my-1 calcHeightPanel sidePanel rounded-lg d-flex flex-column user-select-none" width="400">
        <div class="d-flex pa-3 bg-f5">
          <span class="fsize14 secondaryColor font-weight-bold pa-1">{{currentTask.task_name}}</span>
          <v-spacer></v-spacer>
          <v-icon color="light-blue" :ripple="false" @click="$store.commit('setUpdateTaskPanel','close')">mdi-arrow-right-circle</v-icon>
        </div>
        <div class="pt-4 updateForm">
          <v-form>
          <v-row class="pa-2 ma-0">
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-text-field class="fsize12 secondaryColor" v-model="actualEffort" label="Actual Effort" dense type="time" height="20" hide-details="" name="appt-time" step="0" outlined></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-menu v-model="dueDatePicker" :close-on-content-click="false" transition="scale-transition" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field class="fsize12" v-model="formatedDueDate" outlined persistent-hint label="Add due date" hide-details append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dueDate" :show-current="true" no-title @input="dueDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-select class="fsize12 secondaryColor" v-model="status" :items="statusList" label="Status" hide-details dense outlined menu-props="offset-y"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-select class="fsize12 secondaryColor" v-model="assignedTo" :items="employeeList" label="Assigned To" hide-details dense outlined menu-props="offset-y"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-select class="fsize12 secondaryColor" v-model="project" :items="projectList" label="Project" hide-details dense outlined menu-props="offset-y"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-select class="fsize12 secondaryColor" v-model="manager" :items="['Pradeep K']" label="Manager" hide-details dense outlined menu-props="offset-y"></v-select>
            </v-col>
             <v-col cols="12" sm="6" md="5" class="pa-0 ma-2">
              <v-file-input dense append-icon="mdi-folder-open" label="Add file" hide-details="" prepend-icon="" outlined></v-file-input>
            </v-col>
            <v-col cols="12" sm="6" md="5" class="pa-0 ma-2 d-flex align-center justify-center">
              <v-switch inset v-model="billable" hide-details dense :ripple="false" class="fsize12 secondaryColor ml-2 mt-0" label="Billable"></v-switch>
            </v-col>
          </v-row>
           <v-textarea filled v-model="comments" placeholder="Comments" class="px-3" :rules="commentRules"></v-textarea>
          </v-form>
        </div>
        <v-spacer></v-spacer>
        <div class="footerPad d-flex align-center justify-space-between pa-2 ">
          <span class="fsize12 secondaryColor pr-6">Create on yesterday</span>
          <v-btn depressed color="light-blue" @click="updateTask()" class="text-capitalize white--text">Update</v-btn>
        </div>
      </v-card>
    </v-container> -->

    <v-navigation-drawer class="updatepanel" elevation='1' v-model="updatePanel" :width="panelWidth" absolute right>
      <div class="d-flex pa-3 bg-f5 align-center">
        <span class="fsize14 secondaryColor font-weight-bold pa-1">{{currentTask.task_name}}</span>
        <v-btn depressed color="light-blue" class="text-capitalize fsize12 white--text ml-4" height="24" @click="$store.commit('setExpandPanel' , expandPanel = !expandPanel)" v-model="expandPanel">More details</v-btn>
        <v-spacer></v-spacer>
        <v-icon color="light-blue" :ripple="false" @click="closePanel()">mdi-close-circle</v-icon>
      </div>

      <!-- update form -->
      <div class="d-flex">
        <div v-if="expandPanel">
          <div class="pa-4">
            comments
            <!-- <ul>
              <li class="pb-2 fsize12" v-for="c in commentsData">{{c.comments}}</li>
            </ul> -->
          </div>
        </div>
          <!-- calcHeightPanel -->
        <div class="my-1 sidePanel rounded-lg d-flex flex-column align-end user-select-none">
          <div class="pt-4 updateForm" :style="expandPanel ? 'max-width: 50%' : 'max-width: 100%'">
            <v-form>
              <v-row class="pa-2 ma-0">
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-text-field class="fsize12 secondaryColor" v-model="actualEffort" label="Actual Effort" dense type="time" height="20" hide-details="" name="appt-time" step="0" outlined></v-text-field>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-menu v-model="dueDatePicker" :close-on-content-click="false" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field class="fsize12" v-model="formatedDueDate" outlined persistent-hint label="Add due date" hide-details append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dueDate" :show-current="true" no-title @input="dueDatePicker = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-select class="fsize12 secondaryColor" v-model="status" :items="statusList" label="Status" hide-details dense outlined menu-props="offset-y"></v-select>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-select class="fsize12 secondaryColor" v-model="assignedTo" :items="employeeList" label="Assigned To" hide-details dense outlined menu-props="offset-y"></v-select>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-select class="fsize12 secondaryColor" v-model="project" :items="projectList" label="Project" hide-details dense outlined menu-props="offset-y"></v-select>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-select class="fsize12 secondaryColor" v-model="manager" :items="['Pradeep K']" label="Manager" hide-details dense outlined menu-props="offset-y"></v-select>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2">
                  <v-file-input dense append-icon="mdi-folder-open" label="Add file" hide-details="" prepend-icon="" outlined></v-file-input>
                </v-col>
                <v-col sm="6" md="6" lg="5" class="pa-0 ma-2 d-flex align-center justify-center">
                  <v-switch inset v-model="billable" hide-details dense :ripple="false" class="fsize12 secondaryColor ml-2 mt-0" label="Billable"></v-switch>
                </v-col>
              </v-row>
              <v-textarea filled v-model="comments" placeholder="Comments" class="px-3 secondaryColor" :rules="commentRules"></v-textarea>
            </v-form>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="footerPad d-flex align-center justify-space-between pa-2 ">
        <span class="fsize12 secondaryColor pr-6">Create on yesterday</span>
        <div>
          <v-btn depressed color="grey lighten-2" @click="closePanel()" class="text-capitalize black--text mr-2">Cancel</v-btn>
          <v-btn depressed color="light-blue" @click="updateTask()" class="text-capitalize white--text">Update</v-btn>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    // update task fields
    actualEffort: "01:00",
    assignedTo: JSON.parse(localStorage.getItem("currentUserData")).emp_name,
    project: "",
    manager: "",
    statusList: ["In Progress", "Completed", "Pending", "Cancelled"],
    status: "In Progress",
    dueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dueDatePicker: false,
    comments: "",
    billable: true,
    commentRules: [
      (v) => !!v || "Comments is required",
      (v) =>
        (v && v.length >= 25) || "Comments must be greater than 25 characters",
    ],
  }),

  computed: {
    ...mapGetters({ currentTask: "getCurrentTask" }),
    ...mapGetters("project", { projectList: "getProjectsList" }),
    ...mapGetters("employee", { employeeList: "getEmployeeList" }),
    ...mapGetters("task", { commentsData: "getCommentsData" }),
    ...mapGetters({
      sidePanelState: "getUpdateTaskPanel",
      expandPanelBool: "getExpandPanel",
      panelWidth: "getPanelWidth",
    }),

    // formate date
    formatedDueDate: function () {
      return this.formatDate(this.dueDate);
    },
    updatePanel: {
      get() {
        return this.sidePanelState;
      },
      set(val) {
        this.$store.commit("setUpdateTaskPanel", val);
      },
    },
    expandPanel: {
      get() {
        return this.expandPanelBool;
      },
      set(val) {
        this.$store.commit("setExpandPanel", val);
      },
    },
  },
  methods: {
    closePanel() {
      this.$store.commit("setUpdateTaskPanel", "close");
    },
    updateTask(task) {
      this.$toast.success(
        `Task Updated Successfully (${this.currentTask.task_name})`,
        {
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
        }
      );
      this.$store.commit("setUpdateTaskPanel", "close");
    },

    formatDate(date) {
      if (!date) {
        return null;
      }
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
  created() {
    let jsonObj = {
      end_Date: "25/2/2022",
      start_Date: "25/2/2022",
    };
    this.$store.dispatch("project/getProjects");
    this.$store.dispatch("employee/getEmployees");
    this.$store.dispatch("task/getComments", jsonObj);
  },
};
</script>

<style>
.footerPad {
  width: 100%;
  background-color: #f5f5f5;
  position: absolute;
  bottom: 8px;
}
.calcHeightPanel {
  height: calc(100vh - 176px) !important;
}
.text-overflow {
  width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.updateForm {
  max-height: 650px;
  overflow-y: auto;
}
.bg-f5 {
  background-color: #f5f5f5;
}
.sidePanel {
  /* border: 1px solid #e5e5e5 !important; */
  box-shadow: none !important;
  /* max-width: 80%; */
}

/* nav new design css */
.updatepanel {
  height: calc(100vh - 56px) !important;
}
</style>
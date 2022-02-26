<template>
  <div>
     <div class="ma-4 d-flex align-center justify-space-between">
      <div class="indigo--text">Project details</div>
      <v-btn depressed color="primary" class="text-capitalize">Add</v-btn>
    </div>
    <v-card class="ma-4">
      <v-simple-table fixed-header height="86vh" id="tableData">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader bg-lightgrey">Project Name</th>
            <th class="tableHeader bg-lightgrey">No.of.task</th>
            <th class="tableHeader bg-lightgrey">Overdue task</th>
            <th class="tableHeader bg-lightgrey">Customer Name</th>
            <th class="tableHeader bg-lightgrey">Manager Name</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(i,idx) in projectData" :key="idx">
            <td class="tableContent">{{i.project_name}}</td>
            <td class="tableContent">{{i.no_of_tasks}}</td>
            <td class="tableContent">{{i.no_of_overdue_tasks}}</td>
            <td class="tableContent">{{i.cust_short_name}}</td>
            <td class="tableContent">{{i.manager_name}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Project",
  data: () => ({}),
  computed: {
    ...mapGetters("project", {
      projectData: "getProjects",
    }),
  },
  created() {
    this.$store.dispatch("project/getProjects");
  },
};
</script>

<style>
</style>
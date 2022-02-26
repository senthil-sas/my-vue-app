<template>
  <div>
    <div class="d-flex ma-4">
      <div class="mr-4">
        <v-menu v-model="fromDatePicker" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="formatedFromDate" outlined persistent-hint label="From Date" hide-details append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="fromDate" :show-current="true" :allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)" no-title @input="fromDatePicker = false"></v-date-picker>
        </v-menu>
      </div>
      <div class="mr-3">
        <v-menu v-model="toDatePicker" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="formatedToDate" outlined persistent-hint label="To Date" hide-details append-icon="mdi-calendar" readonly dense v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="toDate" :show-current="true" :allowed-dates="(date) => date <= new Date().toISOString().substr(0, 10)" no-title @input="toDatePicker = false"></v-date-picker>
        </v-menu>
      </div>
      <div>
        <v-btn height="40" color="primary" depressed class="text-capitalize" @click="getReports">Submit</v-btn>
      </div>
     
    </div>
    <v-card class="ma-4">
      <v-simple-table fixed-header height="84vh" id="tableData" v-if="reportsData.length != 0">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader bg-lightgrey">S.No</th>
            <th class="tableHeader bg-lightgrey">Name</th>
            <th class="tableHeader bg-lightgrey text-center">Check In</th>
            <th class="tableHeader bg-lightgrey text-center">Check Out</th>
            <th class="tableHeader bg-lightgrey text-center">Comment</th>
            <th class="tableHeader bg-lightgrey text-center">Office Hours</th>
            <th class="tableHeader bg-lightgrey text-center">Avg/Day (off)</th>
            <th class="tableHeader bg-lightgrey text-center">Task Time</th>
            <th class="tableHeader bg-lightgrey text-center">Avg/Day (Task)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(i,idx) in reportsData" :key="idx">
            <td class="tableContent">{{idx + 1}}</td>
            <td class="tableContent">{{i.emp_name}}</td>
            <td class="tableContent text-center">{{i.check_in}}</td>
            <td class="tableContent text-center">{{i.check_out}}</td>
            <td class="tableContent text-center">{{i.no_of_comments}}</td>
            <td class="tableContent text-center">{{ i.total_office_hours}} ({{i.percentage_hours_logged}}%)</td>
            <td class="tableContent text-center">{{i.avgofficehours}}</td>
            <td class="tableContent text-center">{{i.total_task_hours}} ({{i.percentage_task_hours}}%)</td>
            <td class="tableContent text-center">{{i.avgtaskhours}}</td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-card-text class="text-center" v-else>
          No data found
      </v-card-text>
    </v-card>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "report",
  data: () => ({
    fromDatePicker: false,
    toDatePicker: false,
    fromDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    toDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  }),
  computed: {
    ...mapGetters("report", {
      reportsData: "getReports",
    }),

    formatedFromDate(date) {
      return this.formatDate(this.fromDate);
    },
    formatedToDate(date) {
      return this.formatDate(this.toDate);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    formatDateIndian(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    getReports(){
      var jsonObj = {
      dateProvided: "true",
      start_Date: this.formatDateIndian(this.fromDate),
      end_Date: this.formatDateIndian(this.toDate) 
    };
    this.$store.dispatch("report/getReports",jsonObj);
    }
  },
  watch: {
    fromDate(val) {
      console.log(this.formatDateIndian(val));
    },
  },
  created() {
    this.getReports();
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div class="ma-4 d-flex align-center justify-space-between">
      <div class="indigo--text">Employee details</div>
      <v-btn depressed color="primary" class="text-capitalize">
        Add
      </v-btn>
    </div>
    <v-card class="ma-4">
      <v-simple-table fixed-header height="86vh" class="" id="tableData">
          <thead>
            <tr class="tableRow">
              <th class="tableHeader bg-lightgrey">S.No</th>
              <th class="tableHeader bg-lightgrey">Emp ID</th>
              <th class="tableHeader bg-lightgrey">Emp Name</th>
              <th class="tableHeader bg-lightgrey">Emp Mail</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tableRow" v-for="(i,idx) in employeeData" :key="idx">
              <td class="tableContent">{{idx+1}}</td>
              <td class="tableContent">{{i.emp_id}}</td>
              <td class="tableContent">{{i.emp_name}}</td>
              <td class="tableContent">{{i.emp_email}}</td>
            </tr>
          </tbody>
        </v-simple-table>
    </v-card>
  </div>

</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name:'employee',
    data: () => ({}),
    computed:{
      ...mapGetters('employee',{
        employeeData: 'getEmployees',
      }),
    },
    created() {
      this.$store.dispatch('employee/getEmployees');
    },
}
</script>

<style>
</style>
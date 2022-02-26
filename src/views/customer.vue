<template>
  <div>
    <div class="ma-4  d-flex align-center justify-space-between">
      <div class="indigo--text">Customer details</div>
      <v-btn depressed color="primary" class="text-capitalize">Add</v-btn>
    </div>
    <v-card class="ma-4">
      <v-simple-table fixed-header id="tableData">
        <thead>
          <tr class="tableRow">
            <th class="tableHeader bg-lightgrey">S.No</th>
            <th class="tableHeader bg-lightgrey">Customer Name</th>
            <th class="tableHeader bg-lightgrey">Customer Shortname</th>
            <th class="tableHeader bg-lightgrey">Address One</th>
            <th class="tableHeader bg-lightgrey">Address Two</th>
            <th class="tableHeader bg-lightgrey">Mobile Number</th>
            <th class="tableHeader bg-lightgrey">Email ID</th>
            <th class="tableHeader bg-lightgrey">SPOC Name</th>
          </tr>
        </thead>
        <tbody>
          <tr class="tableRow" v-for="(i,idx) in customerData" :key="idx">
            <td class="tableContent">{{idx+1}}</td>
            <td class="tableContent">{{i.cust_name}}</td>
            <td class="tableContent">{{i.cust_short_name}}</td>
            <td class="tableContent">{{i.address_1}}</td>
            <td class="tableContent">{{i.address_2}}</td>
            <td class="tableContent">{{i.contact_mobile}}</td>
            <td class="tableContent">{{i.contact_email}}</td>
            <td class="tableContent">{{i.spoc_name}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "customer",
  data: () => ({}),
  computed: {
    ...mapGetters("customer", {
      customerData: "getCustomers",
    }),
  },
  created() {
    this.$store.dispatch("customer/getCustomers");
  },
};
</script>

<style>
</style>
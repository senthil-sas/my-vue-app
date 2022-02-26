<template>
  <v-app>
    <v-layout row wrap align-center justify-center class="opansans-font ma-0">
      <v-flex xs12 sm12 md6 lg6 xl6 align-center justify-center>
        <v-row class="ma-0 justify-center">
          <v-card class="pa-6 cardBoxShadow" min-width="350">
            <v-form v-model="loginForm" @submit.prevent="login()" autocomplete='on'>
              <div class="fsize22 mb-6 primaryColor"> Task Manager
              </div>
              <div>
                <p class="mb-2 ml-1 fsize14 primaryColor">Username</p>
                <v-text-field v-model.trim="userName" class="fsize11" placeholder="Enter the username" :rules="userNameRules" autocomplete="on" outlined dense></v-text-field>
              </div>
              <div>
                <p class="mb-2 ml-1 fsize14 primaryColor">Password</p>
                <v-text-field v-model="password" placeholder="Enter the password" class="fsize11" :rules="passwordRules" outlined  autocomplete="on"  dense :type="passwordShow ? 'text' : 'password'" :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow"></v-text-field>
              </div>
              <v-btn type="submit" block depressed class="text-capitalize mt-3 primary" :disabled="!userName || !password">
                Sign In</v-btn>
            </v-form>
          </v-card>
        </v-row>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    userName: "",
    password: "",
    passwordShow: false,
    loginForm: false,
    userNameRules: [
      (v) => !!v || "Username is required",
      // (v) =>(v && v.length <= 20) || "Username must be less than 20 characters",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      // (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
    ],
  }),
  methods: {
    login() {
      this.$store.dispatch("login/login", {
        emp_email: this.userName,
        password: this.password,
      });
    },
  },
};
</script>
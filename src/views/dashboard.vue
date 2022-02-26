<template>
  <v-app id="inspire">
    <v-navigation-drawer mobile-breakpoint="1024" app width="74" v-model="drawer" class="sideNavBar" color="">
      <div>
        <div class="cursor d-flex justify-center align-center mx-2" style="height: 56px; border-bottom: solid 1px #D6D6D6">
          <v-img max-width="36" :src="$store.state.appLogo"></v-img>
        </div>

        <v-tabs class="sidebar mt-3" vertical v-model="selectedTab">
          <v-tab class="sidebarTab" v-for="(item, i) in menuList" @click="changeRoute(item)" :key=i>
            <div class="menu">
              <img :src="getImgUrl(item.svg)" class="unactive_img" />
              <div class="fsize11 primaryColor text-overflow">{{ item.text }}</div>
              <div class="fsize11 primaryColor text-overflow">{{item.subText}}</div>
            </div>
          </v-tab>
        </v-tabs>
      </div>
    </v-navigation-drawer>

    <v-app-bar elevation="1" color="white" app dense outlined height="56px">
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer" class="ma-0"></v-app-bar-nav-icon> -->
      <div class="ml-3 primaryColor">{{$store.state.appName}} - <span class="text-capitalize">{{$router.currentRoute.path.replace("/", "")}}</span> </div>
      <v-spacer></v-spacer>
      <div class="text-right">
        <v-btn @click="logout()" depressed text outlined color="indigo" class="text-capitalize fsize16">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-main class="calcHeight-main main-content">
      <!-- <transition name="slide"> -->
        <router-view></router-view>
      <!-- </transition> -->
    </v-main>

  </v-app>
</template>
<script>
export default {
  name: "Dashboard",
  data: () => ({
    name: name,
    selectedTab: null,
    menuList: [
      { text: "Dashboard", subText: "", svg: "dashboard", route: "dashboard" },
      { text: "Employee", subText: "", svg: "employee", route: "employee" },
      { text: "Customer", subText: "", svg: "customer", route: "customer" },
      { text: "Project", svg: "", svg: "task", route: "project" },
      // { text: "Task", subText: "", svg: "task", route: "task" },
      { text: "Teams", subText: "", svg: "teams", route: "team" },
      { text: "Report", subText: "", svg: "taskreports", route: "report" },
      { text: "Task-New", subText: "", svg: "taskreports", route: "task1"},
    ],
    drawer: null,
  }),
  
  methods: {
    getImgUrl(img) {
      var images = require.context("../assets/menu/", false, /\.svg$/);
      return images("./" + img + ".svg");
    },
    changeRoute(val) {
      this.$router.push(val.route).catch(() => {});
    },
    logout() {
      localStorage.clear();
      this.$toast.success("Logout Successfully", {
        position: "top-right",
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
      this.$router.push("/");
    },
  },

  mounted() {
    this.selectedTab = this.menuList.findIndex(
      (std) => std.route === this.$router.currentRoute.path.replace("/", "")
    );
    var userData = JSON.parse(localStorage.getItem("currentUserData"));
    if (userData) {
      this.$store.commit("login/setCurrentEmpId", userData.emp_id);
    }
  },
};
</script>

<style scoped>
.sidebar {
  width: 74px !important;
}
.w-100 {
  width: 100% !important;
}
.v-navigation-drawer__content .sideNavBar {
  overflow: clip !important;
}
.border-lft {
  border-left: 1px solid #ededed;
}
::v-deep.v-input--dense > .v-input__control > .v-input__slot {
  margin-bottom: 0px !important;
}
.hovershow:hover .indexChart {
  display: block !important;
}
.sidebar .v-tab {
  min-width: 64px !important;
  text-transform: capitalize !important;
  font-weight: normal !important;
  color: #282828 !important;
  padding: 8px 0px !important;
  letter-spacing: normal !important;
}
.sidebar .v-tab--active {
  color: #0065be !important;
}
.sidebar .v-tab--active {
  filter: invert(50%) sepia(85%) saturate(5176%) hue-rotate(192deg)
    brightness(102%) contrast(106%) !important;
}
.sidebar .v-tab:hover {
  filter: invert(50%) sepia(85%) saturate(5176%) hue-rotate(192deg)
    brightness(102%) contrast(106%) !important;
}
.theme--light .darkThemeImg {
  display: contents !important;
}
.theme--dark .sidebar .v-tab .unactive_img {
  display: contents !important;
}
.theme--dark .sidebar .v-tab--active .unactive_img {
  display: inline-block !important;
}
.theme--dark .sidebar .v-tab {
  height: 64px !important;
  text-transform: capitalize !important;
  font-weight: normal !important;
  color: #ffffff !important;
  padding: 8px 0px !important;
  letter-spacing: normal !important;
}
.theme--light .sidebar .v-tab {
  height: 64px !important;
  text-transform: capitalize !important;
  font-weight: normal !important;
  color: #282828 !important;
  padding: 8px 0px !important;
  letter-spacing: normal !important;
}
.theme--dark.v-tabs > .v-tabs-bar {
  background: #363636 !important;
}
.theme--dark.v-navigation-drawer {
  background-color: #1e1e1e !important;
}
.theme--dark.v-app-bar.v-toolbar {
  background-color: #1e1e1e !important;
}
.v-application--is-ltr .v-list-item__action:first-child,
.v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 24px !important;
}
.text-overflow {
  text-overflow: inherit !important;
  overflow: hidden !important;
  width: 60px;
}
.calcHeight-main {
  height: calc(100vh - 56px) !important;
}
.main-content{background-color: #e8e8e8a6;}
</style>
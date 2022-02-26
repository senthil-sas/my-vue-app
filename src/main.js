import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './styles/common.css';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


Vue.config.productionTip = false

createApp(App).use(router).use(vuetify).use(store).use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
}).mount('#app')
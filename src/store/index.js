import Vue from 'vue'
import Vuex from 'vuex'
// app Logo
import appLogo from '../assets/images/codifi.png'

// modules
import login from '../store/modules/login.js'
import employee from '../store/modules/employee.js'
import customer from '../store/modules/customer.js'
import project from '../store/modules/project.js'
import task from '../store/modules/task.js'
import report from '../store/modules/report.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Task-Manager',
    appLogo: appLogo,
    loader: false,
    // sidePanel
    updateTaskPanel:'close',
    currentTask:[],
    expandPanel: false,
    panelWidth : '40%'
  },
  mutations: {
    setLoader ( state, payload ) {
      state.loader = payload
    },
    setUpdateTaskPanel ( state, payload ) {
      state.updateTaskPanel = payload
    },
    setCurrentTask ( state, payload ) {
      state.currentTask = payload
    },
    setExpandPanel ( state, payload ) {
      state.expandPanel = payload
      state.panelWidth = payload ? '100%' : '40%'
    }
  },
  actions: { },
  getters: {
    getLoader: state => {
      return state.loader
    } ,
    getUpdateTaskPanel: state => {
      return state.updateTaskPanel
    },
    getCurrentTask: state => {
      return state.currentTask
    },
    getExpandPanel: state => {
      return state.expandPanel
    },
    getPanelWidth: state => {
      return state.panelWidth
    }
  },
  modules: { login, employee, customer, project, task, report }
})

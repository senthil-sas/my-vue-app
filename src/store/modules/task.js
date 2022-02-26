import service from '../../store/httpService.js'
import router from '@/router'

const task = {
    namespaced: true,
    state: {
        totalTasks: [],
        currentUserTaks: [],
        currentTasks: [],
        commentsData:[],
    },
    mutations: {
        setTasks (state, payload) {
            state.totalTasks = payload
            this.commit('task/setCurrentUserTaks', payload)
        },

        setCurrentUserTaks (state, payload) {
            state.currentUserTaks = payload
        },

        setCurrentTaks (state, payload) {
            state.currentTasks = payload
        },
        setCurrentUserTaks (state, payload) {
            state.currentUserTaks = []
            var empId = JSON.parse(localStorage.getItem('currentUserData')).emp_id
            payload.forEach(el => {
                el.assigned_to == empId ? state.currentUserTaks.push(el) : ''
            });
            this.commit('task/setCurrentTaks', state.currentUserTaks)
        },

        setCommentsData (state, payload) {
            state.commentsData = payload
        }

    },
    actions: {
        async getTasks ({ commit }) {
            commit('setLoader', true, { root: true })
            await service.getTasks().then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('setTasks', response.data.result);
                } else {
                    commit('setTasks', []);
                }
            }).catch(error => {
                if (error.response.status === 401) {
                    router.push("/");
                }
            }).finally(() => { commit('setLoader', false, { root: true }) })
        },
        async createTasks ({ commit,dispatch },payload) {
            service.insertTasks().then(response => {
                if (response.status == 200 && response.data.result) {
                    dispatch('getTasks');
                } 
            }).catch(error => {
                if (error.response.status === 401) {
                    router.push("/");
                }
            }).finally(() => { commit('setLoader', false, { root: true }) })
        },
        async getComments ({ commit },payload) {
            await service.getComments(payload).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('setCommentsData', response.data.result);
                } else {
                    commit('setCommentsData', []);
                }
            }).finally(() => {})
        }
  },
    getters: {
        getAllTasks: state => {
            return state.totalTasks;
        },
        getCurrentUserTaks: state => {
            return state.currentUserTaks;
        },
        getCurrentTasks: state => {
            return state.currentTasks;
        },
        getCommentsData: state => {
            return state.commentsData;
        }
    }
}
export default task;
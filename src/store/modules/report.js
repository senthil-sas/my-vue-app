import service from '../httpService.js'
import router from '@/router'

const report = {
    namespaced: true,
    state: {
        reports: [],
    },
    mutations: {
        setReports (state, payload) {
            state.reports = payload
        }
    },
    actions: {
        getReports ({ commit }, jsonObj) {
            commit('setLoader', true, { root: true })
            service.getReports(jsonObj).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('setReports', response.data.result);
                } else {
                    commit('setReports', []);
                }
            }).finally(() => { commit('setLoader', false, { root: true }) })
        }
    },
    getters: {
        getReports: state => {
            return state.reports;
        }
    }
}
export default report;
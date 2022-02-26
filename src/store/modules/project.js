import service from '../../store/httpService.js'
import router from '@/router'

const project = {
    namespaced: true,
    state: {
        projects: [],
        projectList:[],
    },
    mutations: {
        setProjects (state, payload) {
            state.projects = payload
            payload.forEach(el => {
                state.projectList.push(el.project_name)
            })
        }
    },
    actions: {
        getProjects ({ commit }) {
            commit('setLoader', true, { root: true })
            service.getProjects({}).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('setProjects', response.data.result);
                }
            }).finally(() => { commit('setLoader', false, { root: true }) })
        }
    },
    getters: {
        getProjects: state => {
            return state.projects;
        },
        getProjectsList: state => {
            return state.projectList;
        }
    }
}
export default project;
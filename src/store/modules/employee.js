import service from '../../store/httpService.js'
import router from '@/router'

const employee = {
    namespaced: true,
    state: {
        employees: [],
        employeeList:[],
    },
    mutations: {
        setEmployees (state, payload) {
            state.employees = payload;
            payload.forEach(el => {
                state.employeeList.push(el.emp_name)
            })
        }
    },
    actions: {
        getEmployees ({ commit }) {
            commit('setLoader', true, { root: true })
            service.getEmployee({}).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('setEmployees', response.data.result);
                }
            }).finally(() => { commit('setLoader', false, { root: true }) })
        }
    },
    getters: {
        getEmployees: state => {
            return state.employees;
        },
        getEmployeeList: state => {
            return state.employeeList;
        }
    }
}
export default employee;
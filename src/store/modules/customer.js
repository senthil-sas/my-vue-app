import service from '../../store/httpService.js'
import router from '@/router'

const customer = {
    namespaced: true,
    state: {
        customersData: [],
    },
    mutations: {
        setCustomers (state, payload) {
            state.customersData = []
            payload.forEach(el => {
                el.cust_name != ' ' ? state.customersData.push(el) : ''
            })
        }
    },
    actions: {
        getCustomers ({ commit }) {
            commit('setLoader', true, { root: true })
            service.getCustomer({}).then(response => {
                if (response.status == 200 && response.data.result) {
                    commit('setCustomers', response.data.result);
                }
            }).finally(() => { commit('setLoader', false, { root: true }) })
        }
    },
    getters: {
        getCustomers: state => {
            return state.customersData;
        }
    }
}
export default customer;
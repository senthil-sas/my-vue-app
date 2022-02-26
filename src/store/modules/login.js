import service from '../../store/httpService.js'
import router from '@/router'

const login = {
    namespaced: true,

    state: {
        userData: [],
        currentEmpId: ''
    },

    mutations: {
        setUserData (state, payload) {
            state.userData = payload;
        },
        setCurrentEmpId(state, payload) {
            state.currentEmpId = payload;
        }
    },

    actions: {
        async login ({ state, commit,dispatch, rootState },payload) {
            await service.login(payload).then((response) => {
                if (response.status == 200 && response.data.message == 'login Sucesss') {
                    commit('setUserData', response.data.result);
                    localStorage.setItem('userId', response.data.result.emp_email);
                    localStorage.setItem('sessionId', response.data.result.tokenkey);
                    localStorage.setItem('currentUserData', JSON.stringify(response.data.result));
                    dispatch('checkIn', {emp_id : response.data.result.emp_id})
                }}).finally(() => {});
        },
        async checkIn ({ commit}, payload) {
            await service.checkIn(payload).then(() => { 
                router.push('/dashboard')
             })
        },
    },
    getters: {
        getUserData: state => {
            return state.userData;
        },
        getCurrentEmpId: state => {
            return state.currentEmpId;
        }
    }
}

export default login
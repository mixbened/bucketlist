import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            userName: '',
            userId: null
        }
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        setUserName: function(state, payload){
            state.user = payload
        }
    }
})

export default store
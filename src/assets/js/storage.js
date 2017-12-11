import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    headIsShow: true,
    token: null,
  },
  getters: {
    getToken: state => {
      return state.token;
    },
    getHeadIsShow:state=>{
      return state.headIsShow;
    }
  },
  mutations: {
    showFoot: state => {
      state.headIsShow = true, console.log(state.headIsShow)
    },
    hideFoot: state => {
      state.headIsShow = false, console.log(state.headIsShow)
    }
  }
});

export default store;

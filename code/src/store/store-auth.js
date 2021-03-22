import { auth_logout } from 'src/services/cloud_auth';


const state = {
  user: '',
  loggedIn: false,
  language: 'en',
  role: "",
};

const mutations = {
  logout(state, {}) {
    state.user = '';
    state.loggedIn = false;
  },

  login(state, payload) {
    state.user = payload.email;
    state.accessGroups = payload.accessGroups;
    state.loggedIn = true;
  },

  language(state, payload) {
    console.log('commit');
    state.language = payload.language;
  }
};

const actions = {
  async language(context, payload) {
    context.commit('language', payload);
  },
  async logIn(context, payload) {
    try {
      context.commit('login', payload);
    } catch (err) {
      throw err;
    }
  },
  async logOut(context, payload) {
    await auth_logout();
    context.commit('logout', {});
  }
};

const getters = {
  user: state => {
    return state.user;
  },

  token: state => {
    return state.token;
  },
  loggedIn: state => {
    return state.loggedIn;
  },
  language: state => {
    return state.language;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

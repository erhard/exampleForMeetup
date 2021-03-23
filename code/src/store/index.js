import Vue from 'vue';
import Vuex from 'vuex';
import auth from './store-auth';
import photo from "./store-photo";

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      photo,
      auth,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}

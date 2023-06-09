
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import getters from './getters';

import utils from '@/utils/utils';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        user
      },
      getters
    
    // 持久化vuex状态
    // plugins: [createPersistedState({
    //     storage: {
    //         getItem: key => utils.getLocal(key),
    //         setItem: (key, value) => utils.saveLocal(key, value, 1 * 24 * 60 * 60),
    //         removeItem: key => utils.removeLocal(key)
    //     }
    // })]
})
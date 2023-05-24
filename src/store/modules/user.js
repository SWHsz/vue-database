import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: null, // 用户名
    status: false, // 登录状态
    token: "", // 客户端记号
    roles: [], //权限数据
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_TOKEN: (state, token) => {
      console.log(token)
      state.token = token
      console.log(state.token)
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      let token = getToken();
      console.log(token);
      //将token传入state
      commit('SET_TOKEN', token);
      
      console.log(state.token);
      return new Promise((resolve, reject) => {
        console.log(state.token);
        getUserInfo(state.token).then(data => {
          // commit('SET_USERNAME', data.username);
          // commit('SET_STATUS', true);
          // if(data.is_admin)
          //   commit('SET_ROLES', ['admin']);
          // else 
          //   commit('SET_ROLES', ['user']);
          resolve(data);
        }).catch(error => {
          console.log(error);
          reject(error);
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          this.dispatch('FedLogOut');
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 前端被迫登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', null);
        commit('SET_STATUS', false);
        commit('SET_USERNAME', null);
        commit('SET_ROLES', []);
        removeToken();
        resolve();
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role);
        setToken(role);
        getUserInfo(role).then(data => {
          commit('SET_ROLES', data.roles);
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          commit('SET_INTRODUCTION', data.introduction);
          resolve();
        })
      })
    }
  }
}

export default user

// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }
// 面试题:项目中token是如何管理的
// 1.token交给vuex管理
// 2.token在vuex还要做持久化处理,第一种(建议),localStorage本地存储 第二种ck
// 3.导入封装的函数(持久化)
// 4.书写修改token的方法
// 5.token是登录请求之后服务端给我们的,在actions里定义什么时候触发mutations里操作token的方法
// 6.用户在login组件,点击登录按钮触发actions里这个发送登录方法
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
import router from '@/router'
const state = {
  // vuex初始化的时候就从本地拿token,有就有,没就null
  token: getToken()
}
const mutations = {
  // 修改token
  setToken(state, token) {
    // 1.修改vuex的token
    state.token = token
    // 2.修改本地存储的token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    // 1.清空vuex的token
    state.token = null
    // 2.清空本地存储的token
    removeToken()
  }
}
const actions = {
  // 发送登录请求
  async login(context, data) {
    // 发异步请求
    const result = await login(data)
    context.commit('setToken', result)
    // 跳转到目录
    router.push({ path: '/' })
    // 不想捕获失败操作
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}


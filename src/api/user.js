import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: "/vue-admin-template/user/login",
//     method: "post",
//     data,
//   });
// }
// es6改造下
export const login = (data) =>
  request({ url: '/sys/login', method: 'POST' })
export const getInfo = (data) =>
  request({})
export function logout() {
  return request({
  })
}

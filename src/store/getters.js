const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 把模块中的token中转下,方便访问
  token: state => state.user.token
  // avatar: state => state.user.avatar,
  // name: state => state.user.name
}
export default getters

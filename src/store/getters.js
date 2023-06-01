const getters = {
  permissionRouters: state => state.app.routers, // 符合权限的路由
  addRouters: state => state.app.addRouters, // 根据权限获取到的路由列表
  routerLoading: state => state.app.routerLoading, // 路由加载标识
  username: state => state.user.username, // 用户名
  token: state => state.user.token, // token
  roles: state => state.user.roles, // 用户权限
  isLogin: state => state.user.status, // 登录状态
}
export default getters

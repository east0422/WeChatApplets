//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    session: null, // 登录session
    userInfo: null, // 用户信息对象，不包含 openid 等敏感信息
    encryptedData: null, // 包括敏感数据在内的完整用户信息的加密数据
    iv: null, // 加密算法的初始向量
    user: null // 自定义返回用户信息
  }
})
//index.js
//获取应用实例
const api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    motto: '欢迎使用九零e淘'
  },
  onLoad: function () {
    this.getUserInfo()
  },
  bindGetUserInfo: function (e) {
    this.getUserInfo()
  },
  showToast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
  wxGetUserInfo: function () { // 直接调用wx.getUserInfo
    wx.getUserInfo({
      withCredentials: true,
      success: res => {
        app.globalData.userInfo = res.userInfo
        app.globalData.encryptedData = res.encryptedData
        app.globalData.iv = res.iv
        api.sessionCheck((code) => {
          this.getUser(code)
        })
      },
      fail: error => {
        this.showToast('获取用户信息失败:' + error.errMsg)
      }
    })
  },
  getUserInfo: function () {
    let that = this
    wx.getSetting({ // 查看是否授权
      success(res) {
        if (res.authSetting['scope.userInfo']) { // 已经授权，可以直接调用 getUserInfo 获取头像昵称等
          that.wxGetUserInfo()
        }
      },
      fail(error) {
        that.showToast('获取用户当前设置失败:' + error.errMsg)
      }
    })
  },
  getUser: function(code) {
    api.login('', code).then((resp) => {
      let respData = resp.data
      if (respData.login) { // 登录成功
        app.globalData.user = respData.data;
        wx.switchTab({
          url: '/pages/search/search'
        })
      } else {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    }, (error) => {
      wx.redirectTo({
        url: '/pages/login/login'
      })
    });
  }
})

// pages/login/login.js
const api = require('../../utils/api.js');
const userreg = new RegExp("^\\d{7,11}$");

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    loginaccount: null,
    regaccount: null,
    inviteaccount: null,
    loginerror: false,
    regerror: false,
    reginviteerror: false
  },

  loginaccountInput: function (e) {
    this.setData({ loginaccount: e.detail.value });
  },
  regaccountInput: function (e) {
    this.setData({ regaccount: e.detail.value });
  },
  inviteaccountInput: function (e) {
    this.setData({ inviteaccount: e.detail.value });
  },
  changeActive: function(e) { // 切换登录、注册
    this.setData({ active: e.currentTarget.dataset.active});
  },

  login: function (code) {
    api.login(this.data.loginaccount, code).then((resp) => {
      let respData = resp.data
      if (respData.login) { // 登录成功
        app.globalData.user = respData.data;
        wx.switchTab({
          url: '/pages/search/search'
        })
      } else {
        wx.showToast({
          title: '登录失败' + respData.err,
          icon: 'none',
          duration: 2000
        })
      }
    }, (error) => {
      console.log('login error:', error);
    });
  },
  handleLogin: function() {
    if (!userreg.test(this.data.loginaccount)) {
      this.setData({ loginerror: true });
    } else {
      this.setData({ loginerror: false });
      api.sessionCheck((code) => {
        this.login(code);
      });
    }
  },
  reg: function(code) {
    api.reg(this.data.regaccount, this.data.inviteaccount, code).then((resp) => {
      let respData = resp.data
      if (respData.login) { // 注册成功
        app.globalData.user = respData.data;
        wx.switchTab({
          url: '/pages/search/search'
        })
      } else {
        wx.showToast({
          title: '注册失败' + respData.err,
          icon: 'none',
          duration: 2000
        })
      }
    }, (error) => {
      console.log('login error:', error);
    });
  },
  handleReg: function() {
    if (!userreg.test(this.data.regaccount)) {
      this.setData({ regerror: true });
    } else if (!userreg.test(this.data.inviteaccount)) {
      this.setData({ regerror: false, reginviteerror: true });
    } else {
      this.setData({ regerror: false, reginviteerror: false });
      api.sessionCheck((code) => {
        this.reg(code);
      });
    }
  }
})
// pages/mine/mine.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    mineItems: [{
      msg: '资料',
      name: 'material',
      type: 'query',
      title: '个人资料',
      showdividing: false,
      showblank: false
    }, {
      msg: '邀请',
      name: 'invite',
      type: 'query',
      title: '邀请列表',
      showdividing: true,
      showblank: false
    }, {
      msg: '余额',
      name: 'balance',
      type: 'query',
      title: '余额信息',
      showdividing: true,
      showblank: false
    }, {
      msg: '订单',
      name: 'order',
      type: 'query',
      title: '我的订单',
      showdividing: true,
      showblank: false
    }, {
      msg: '提现',
      name: 'tixian',
      type: 'query',
      title: '我要提现',
      showdividing: true,
      showblank: true
    }, {
      msg: '新人引导',
      name: 'noviceguide',
      type: 'guide',
      title: '新人引导',
      showdividing: false,
      showblank: false
    }, {
      msg: '邀请引导',
      name: 'inviteguide',
      type: 'guide',
      title: '邀请引导',
      showdividing: true,
      showblank: true
    }, {
      msg: '客服中心',
      name: 'help',
      type: 'display',
      title: '客服中心',
      showdividing: false,
      showblank: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.user
    });
  },
  mineitemTaped: function(item) {
    let url = ''
    if (item.detail.type == 'query') {
      url = '/pages/minedetail/minedetail?msg=' + item.detail.msg
    } else if (item.detail.type == 'display') {
      url = '/pages/' + item.detail.name + '/' + item.detail.name
    } else if (item.detail.type == 'guide') {
      url = '/pages/guide/guide?guidename=' + item.detail.msg
    }
    if (url) {
      wx.navigateTo({
        url: url
      })
    }
  },
  logoutTaped: function() {
    app.globalData.user = null;
    wx.redirectTo({
      url: '/pages/login/login'
    });
  }
})
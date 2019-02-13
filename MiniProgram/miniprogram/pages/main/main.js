// pages/main/main.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qq: '',
    content: '',
    fl_system: '',
    sd_system: '',
    currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options:', options);
    this.setData({
      'qq': options.qq,
      'fl_system': options.fl_system,
      'sd_system': options.sd_system
    });
    app.editTabbar();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  sendMsg: function(type) {
    this.setData({
      content: type
    });
    // var msg = type;
    // var that = this;
    // if (msg == '发送') {
    //   msg = that.data.content;
    //   if (msg == '' || msg == '消息不能为空') {
    //     that.setData({ content: '消息不能为空' });
    //     return;
    //   }
    // }

    // console.log(msg);
    // wx.request({
    //   url: 'http://app.9gola.cn',
    //   data: { 'qq': this.qq, 'msg': msg },
    //   header: {
    //       'content-type': 'application/json'
    //   }, // 默认值
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function(res) {
    //     var result = res.data;
    //     var result2 = result.replace(/<br \/>/g, '\n');
    //     that.setData({ content: result2 })
    //     //这里返回成功 需要赋值text里面
    //   }
    // });
  },

  bindTextAreaBlur: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  clear: function() {
    this.setData({
      content: ''
    });
  },

  logout: function() {
    wx.redirectTo({
      url: '/pages/login/login',
    });
  },

  changeTab(e) {
    this.setData({
      currentTab: e.detail.tabIndex
    });
  },

  itemTaped(e) {
    let itemIndex = e.detail.itemIndex;
    console.log('itemIndex:', itemIndex);
    switch (this.data.currentTab) {
      case 0: // home
        switch (itemIndex) {
          case 0: // 余额
            this.sendMsg('余额');
            break;
          case 1: // 订单
            this.sendMsg('订单');
            break;
          case 2: // 资料
            this.sendMsg('资料');
            break;
          case 3: // 提现
            this.sendMsg('提现');
            break;
          default:
            // statements_def
            break;
        }
        break;
      case 1: // api
        switch (itemIndex) {
          case 0: // 淘宝
            this.sendMsg('淘宝');
            break;
          case 1: // 清空
            this.clear();
            break;
          default:
            // statements_def
            break;
        }
        break;
      default:
        break;
    }
  }
})
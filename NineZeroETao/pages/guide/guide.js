// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guideSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.guidename
    })
    let guideSrc = ''
    if (options.guidename == '新人引导') {
      guideSrc = 'https://localhost/help/'
    } else if (options.guidename == '邀请引导') {
      guideSrc = 'https://localhost/inviter/'
    }
    if (guideSrc) {
      this.setData({
        guideSrc: guideSrc + '?noCache=' + new Date().getTime()
      })
    }
  }
})
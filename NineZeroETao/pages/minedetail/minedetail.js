// pages/minedetail/minedetail.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',
    copyresult: '',
    tip: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.msg
    });
    this.fetchData(options.msg)
  },
  fetchData: function(msg) {
    api.searchMsg(msg).then((resp) => {
      console.log('fetachData resp:', resp)
      let respData = resp.data
      if (respData) {
        switch (parseInt(respData.type)) {
          case 2:
          case 3:
          case 8:
            this.setData({
              tip: respData.tip,
              result: respData.msg,
              copyresult: respData.result.tkl
            })
            break
          default:
            this.setData({
              tip: '',
              result: respData.msg,
              copyresult: respData.msg
            })
            break
        }
      } else {
        this.setData({
          tip: '',
          result: '对不起，没有找到对应的数据!',
          copyresult: '对不起，没有找到对应的数据!'
        })
      }
    }).catch(error => {
      console.log('minedetail error:', error)
      this.setData({
        tip: '',
        result: '对不起，查询出错！',
        copyresult: '对不起，查询出错！'
      })
    })
  },
  copyTaped: function() {
    if (this.data.copyresult) {
      wx.setClipboardData({
        data: this.data.copyresult,
        success(res) {}
      })
    } else {
      wx.showToast({
        title: '当前无可复制内容！',
        icon: 'none',
        duration: 2000
      });
    }
  }
})
// pages/search/search.js
const api = require('../../utils/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchmsg: '',
    searchresult: '',
    copymsg: '',
    tip: '',
    showresult: false,
    welcome: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      welcome: '欢迎登录，' + app.globalData.user.user
    });
  },

  searchmsgInput: function (e) {
    this.setData({
      searchmsg: e.detail.value
    })
  },
  searchTaped: function() {
    if (!this.data.searchmsg) {
      wx.showToast({
        title: '请在文本框中输入或粘贴内容！',
        icon: 'none',
        duration: 2000
      });
      return
    }

    api.searchMsg(this.data.searchmsg).then((resp) => {
      this.setData({
        showresult: true,
        searchmsg: ''
      });
      let respData = resp.data
      if (respData) {
        switch (parseInt(respData.type)) {
          case 2:
          case 3:
          case 8:
            this.setData({
              tip: respData.tip,
              searchresult: respData.msg ? respData.msg : '对不起，没有找到对应的数据!',
              copymsg: respData.result.tkl
            });
            break
          default:
            this.setData({
              tip: '',
              searchresult: respData.msg ? respData.msg : '对不起，没有找到对应的数据!',
              copymsg: respData.msg ? respData.msg : '对不起，没有找到对应的数据!'
            });
            break
        }
      } else {
        this.setData({
          tip: '',
          searchresult: '对不起，没有找到对应的数据!',
          copymsg: '对不起，没有找到对应的数据!'
        });
      }
    }).catch(error => {
      this.setData({
        showresult: true,
        searchmsg: '',
        tip: '',
        searchresult: '对不起，查询出错！',
        copymsg: '对不起，查询出错！'
      });
      console.log('search error:', error)
    })
  },
  copyTaped: function () {
    if (this.data.copymsg) {
      wx.setClipboardData({
        data: this.data.copymsg,
        success(res) {
        }
      })
    } else {
      wx.showToast({
        title: '当前无可复制内容！',
        icon: 'none',
        duration: 2000
      });
    }
  },
  clearTaped: function() {
    this.setData({
      searchresult: '',
      copymsg: ''
    })
  }
})
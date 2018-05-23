// pages/measure/measure.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: 0, // 当前E方向，向右(0/1/2/3 -> 右/下/左/上)
    scale: 1.0, // 图片缩放
    errorTimes: 0, // 连续错误次数
  },
  // 上/下/左/右
  orientationClicked: function (event) {
    var moveDirection = -1
    switch (event.currentTarget.dataset.direction) {
      case 'right': {
        moveDirection = 0
        break
      }
      case 'down': {
        moveDirection = 1
        break
      }
      case 'left': {
        moveDirection = 2
        break
      }
      case 'up': {
        moveDirection = 3
        break
      }
    }
    var newScale = this.data.scale
    var newErrorTimes = this.data.errorTimes + 1
    if (moveDirection == this.data.direction) { // correct
      newErrorTimes = 0
      if (newScale > 0.1) {
        newScale = newScale - 0.05
      } else {
        this.showResult()
        return
      }
    } else { // error
      if (newErrorTimes == 2) { //
        newScale = newScale + 0.05
      } else if (newErrorTimes == 3) {
        this.showResult()
        return
      }
    }

    var newDirection = this.randomDirection()
    this.setData({
      direction: newDirection,
      scale: newScale,
      errorTimes: newErrorTimes
    }) 
  },
  randomDirection: function() {
    var newDirection = Math.floor(Math.random() * 4)
    while (newDirection == this.data.direction) {
      newDirection = Math.floor(Math.random() * 4)
    }
    return newDirection
  },
  showResult: function() {
    app.globalData.scale = this.data.scale
    wx.navigateTo({
      url: '../result/result'
    })
  },
  shake: function () {
    var _this = this
    wx.onAccelerometerChange(function (e) {
      if (Math.abs(e.x) > 1 || Math.abs(e.y) > 1) {
        _this.showResult()
        wx.stopAccelerometer()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      scale: 1.0
    })
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
    this.shake()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.stopAccelerometer()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopAccelerometer()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
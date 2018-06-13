// pages/measure/measure.js
const app = getApp()
var timer; // 计时器

const roadLength = 420  // rpx
const runStep = 50 // rpx
const scaleStep = 0.1 

const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    direction: 0, // 当前E方向，向右(0/1/2/3 -> 右/下/左/上)
    scale: 1, // 图片缩放
    errorTimes: 0, // 连续错误次数
    bridge: 1, // 1 吊桥挂起， 2 吊桥落下
    peoplebottom: 130, // people距离底部距离
    startOrPause: '开始', // 开始暂停按钮
    btnHeight: 90, // 底部按钮高度
    disabled: true, // 底部四个按钮是否可用，点击一次之后未走完不允许再点击
    animationDisplay: 'none',
  },
  // 上/下/左/右
  orientationClicked: function (event) {
    innerAudioContext.src = '/audio/bullet.mp3'
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
    var bridge = 1
    if (moveDirection == this.data.direction) { // correct
      bridge = 2
    }

    this.setData({
      bridge: bridge,
      disabled: true,
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
  showAnimation: function () {
    var that = this
    that.setData({
      animationDisplay: 'block',
    })

    setTimeout(function () {
      that.setData({
        animationDisplay: 'none',
      })
    }, 100)
  },
  judgeGameOverOrNot: function () {
    var newScale = this.data.scale
    var newErrorTimes = this.data.errorTimes + 1
    if (this.data.bridge === 2) { // correct
      newErrorTimes = 0
      if (newScale > 0.2) {
        newScale = newScale - scaleStep
      } else {
        this.gameOver()
        return
      }
    } else { // error
      if (newErrorTimes == 2) { //
        newScale = newScale + scaleStep
      } else if (newErrorTimes == 3) {
        this.gameOver()
        return
      }
    }

    var newDirection = this.randomDirection()
    this.setData({
      direction: newDirection,
      scale: newScale,
      errorTimes: newErrorTimes,
      bridge: 1,
      peoplebottom: 130,
      disabled: false,
    })
    this.showAnimation()
    this.peopleRun()
  },
  peopleRun: function () {
    var that = this
    timer = setTimeout(function () {
      if (that.data.peoplebottom < roadLength) { // 在道路上
        if (that.data.bridge === 2) { // 桥已落下
          that.judgeGameOverOrNot()
        } else { // 桥未落下继续走
          that.setData({
            peoplebottom: that.data.peoplebottom + runStep
          })
          that.peopleRun()
        }
      } else { // 道路已经走完
        that.judgeGameOverOrNot()
      }
    }, 500)
  },
  gameOver: function () {
    clearTimeout(timer)
    var that = this
    wx.showModal({
      title: '游戏结束',
      showCancel: true,
      cancelText: '下次再玩',
      confirmText: '再来一次',
      content: '视力值： ' + that.data.scale,
      success: function (res) {
        if (res.confirm) {
          that.resetData()
          that.setData({
            disabled: false,
            startOrPause: '暂停',
          })
          that.peopleRun()
        } else if (res.cancel){
          that.showResult()
          that.resetData()
        }
      }
    })
  },
  startorpauseClicked: function (event) {
    var startOrPause = '开始'
    var disabled = true
    if (this.data.startOrPause === '开始') {
      startOrPause = '暂停'
      disabled = false
      this.peopleRun()
      innerAudioContext.pause()
    } else {
      startOrPause = '开始'
      disabled = true
      clearTimeout(timer)
      innerAudioContext.play()
    }
    this.setData({
      startOrPause: startOrPause,
      disabled: disabled
    })
  },
  resetData: function () {
    this.setData({
      direction: 0,
      errorTimes: 0,
      scale: 1,
      bridge: 1,
      peoplebottom: 130,
      startOrPause: '开始',
      disabled: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.resetData()
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
    // 摇一摇
    // this.shake()

    // 播放背景音乐
    innerAudioContext.autoplay = true
    innerAudioContext.src = '/audio/bgm.mp3'
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // wx.stopAccelerometer()
    innerAudioContext.stop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // wx.stopAccelerometer()
    innerAudioContext.stop()
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
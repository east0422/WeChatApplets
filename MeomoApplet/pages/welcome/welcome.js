//welcome.js
//欢迎页面
Page({
  data: {
    title: '欢迎使用MeoMo测一测',
    guide: '拿起手机，伸直手臂。点击左上角开始按钮即可开始，在手机底部点击和右上角E字方向一致按钮，若正确E字会变小，错一次E字会随机旋转一个方向，连续错两次E字变大，连续错三次结束本次测量。若看不清可摇动手机结束当前测量。',
  },
  //事件处理函数
  nextClicked: function() {
    wx.navigateTo({
      url: '../measure/measure'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        console.log('model:', res.model)
        console.log('pixelRatio:', res.pixelRatio)
        console.log('screenWidth:', res.screenWidth)
        console.log('screenHeight:', res.screenHeight)
        console.log('windowWidth:', res.windowWidth)
        console.log('windowHeight:', res.windowHeight)
        console.log('language:', res.language)
        console.log('version:', res.version)
        console.log('platform:', res.platform)
      }
    })
  }
})

// pages/login/login.js

const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    qq: '',
    warn: '',
    isSubmit: false

  },

  formSubmit: function (e) {
    var { qq } = e.detail.value;
    if (!qq) {
      this.setData({
        warn: "qq输入为空，请检查！",
        isSubmit: true
      })
      return;
    } else {
      var that = this;
      wx.request({
        url: 'http://app.9gola.cn',
        data: { 'qq': qq },
        header: {
          'content-type': 'application/json'
        }, // 默认值
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          console.log('success res:', res);
          wx.navigateTo({
            url: '/pages/main/main?qq=' + qq +
              '&fl_system=fl_system11' +
              '&sd_system=sd_system22'
          });
          // let resQQ = res.data.qq;
          // if (resQQ != '' && resQQ != null) {
          //   wx.navigateTo({
          //     url: '/pages/main/main?qq=' + resQQ +
          //       '&fl_system=' + res.data.fl_system +
          //       '&sd_system=' + res.data.sd_system
          //   });
          // } else {
          //   that.setData({
          //     isSubmit: true,
          //     warn: "账号不存在"
          //   });
          // }
        },
        fail: function (res) {
          that.setData({
            isSubmit: true,
            warn: res.data
          });
        }
      });
    }
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  }
})

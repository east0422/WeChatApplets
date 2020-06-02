const API_SERVER = 'https://localhost/serverapi'
const COUPON_API = 'https://localhost/couponapi'
const app = getApp();

const apiRequest = (url, method, params) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '拼命加载中......',
      mask: true
    });
    wx.request({
      url: url ? url: API_SERVER,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: params,
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  })
}

const api = {
  // 检查登录是否过期
  sessionCheck: (callback) => {
    wx.checkSession({
      success() {
        callback(null); // session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        api.getCode((code) => { // session_key 已经失效，需要重新执行登录流程
          callback(code);
        })
      }
    })
  },
  // 获取code
  getCode: (callback) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              app.globalData.userInfo = res.userInfo
              app.globalData.encryptedData = res.encryptedData
              app.globalData.iv = res.iv
              callback(res.code)
            },
            fail: error => {
              wx.showToast({
                title: '获取用户信息失败:' + error.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else {
          wx.showModal({
            title: '登录',
            content: '登录失败！' + res.errMsg,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      },
      fail: function (error) {
        wx.showModal({
          title: '登录',
          content: '获取code失败！' + eror,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      },
      complete: function (res) {
      }
    });
  },
  // 注册
  reg: (regaccount, inviteaccount, code) => {
    let params = {
      sys: 'fl',
      type: 'reg',
      code: code,
      user: regaccount,
      inviter: inviteaccount,
      encryptedData: app.globalData.encryptedData,
      iv: app.globalData.iv,
    }
   return apiRequest('', 'POST', params);
  },
  // 登录
  login: (account, code) => {
    let params = {
      sys: 'fl',
      type: 'login',
      code: code,
      user: account,
      encryptedData: app.globalData.encryptedData,
      iv: app.globalData.iv,
    }
    return apiRequest('', 'POST', params);
  },
  // 查询msg
  searchMsg: (msg) => {
    let user = app.globalData.user
    let params = {
      sys:'fl',
      type: 'query',
      msg: encodeURI(msg),
      user: user.user,
      inviter: user.inviter,
      url: user.url,
    }
    return apiRequest('', 'POST', params)
  },
  // 查询优惠券
  couponList: (key, page, cid) => {
    let params = {
      method: 'getQuan',
      key: key,
      page: page,
      cid: cid
    }
    return apiRequest(COUPON_API, 'POST', params)
  }
}

module.exports = api;
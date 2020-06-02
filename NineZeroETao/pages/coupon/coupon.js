// pages/coupon/coupon.js
const api = require('../../utils/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    couponname: null,
    couponlist: [],
    tabs: [{
      index: 0,
      cid: 0,
      title: '全部'
    }, {
      index: 1,
      cid: 1,
      title: '女装'
    }, {
      index: 2,
      cid: 9,
      title: '男装'
    }, {
      index: 3,
      cid: 10,
      title: '内衣'
    }, {
      index: 4,
      cid: 2,
      title: '母婴'
    }, {
      index: 5,
      cid: 3,
      title: '化妆品'
    }, {
      index: 6,
      cid: 4,
      title: '居家'
    }, {
      index: 7,
      cid: 5,
      title: '鞋包配饰'
    }, {
      index: 8,
      cid: 6,
      title: '美食'
    }, {
      index: 9,
      cid: 7,
      title: '文体车品'
    }, {
      index: 10,
      cid: 8,
      title: '数码家电'
    }],
    activecid: 0,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.user
    })
    this.fetchCouponList(() => {}, () => {})
  },

  couponnameInput: function(e) {
    this.setData({
      couponname: e.detail.value
    })
  },

  fetchCouponList: function(successCallback, errorCallback) {
    let key = this.data.couponname == null ? '' : this.data.couponname
    api.couponList(key, this.data.pageNum, this.data.activecid).then((resp) => {
      successCallback()
      let respData = resp.data
      let msg = ''
      if (respData.message == '') {
        msg = '亲！已经到底了！！'
      } else if (respData.message.count == 0) {
        msg = '您好,暂时找不到符合您要求的数据！'
        this.setData({
          couponlist: []
        })
      }
      if (msg != '') {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
        return
      }
      let coupons = this.data.couponlist
      if (this.data.pageNum == 1) {
        coupons = []
      }
      coupons = coupons.concat(respData.message)
      coupons.sort((data1, data2) => { // 降序
        return data2.Quan_price - data1.Quan_price
      })
      this.setData({
        couponlist: coupons
      })
    }, (error) => {
      wx.showToast({
        title: '加载优惠券失败:' + error.errMsg,
        icon: 'none',
        duration: 2000
      })
    }).catch(error => {
      console.log('load coupon error:', error)
      errorCallback()
      this.setData({
        couponlist: []
      })
    })
  },
  refresh: function(e) { // 下拉刷新
    this.setData({
      pageNum: 1,
      couponname: null
    })
    this.fetchCouponList(() => {}, () => {})
  },
  loadmore: function(e) { // 上拉加载更多
    this.setData({
      pageNum: this.data.pageNum + 1
    })
    this.fetchCouponList(() => {}, () => {})
  },
  searchTaped: function() {
    this.setData({
      pageNum: 1,
      activecid: this.data.tabs[0].cid
    })
    this.fetchCouponList(() => {}, () => {})
  },
  tabChanged: function(e) {
    this.setData({
      pageNum: 1,
      activecid: e.currentTarget.dataset.coupon.cid,
      couponname: null
    })
    this.fetchCouponList(() => {}, () => {})
  }
})
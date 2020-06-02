// components/couponitem/couponitem.js
const api = require('../../utils/api.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponitem: {
      require: true,
      type: Object,
      default: function () {
        return {
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    queryOfferTaped: function () {
      api.searchMsg('https://localhost/couponitem/item.htm?id=' + this.data.couponitem.GoodsID).then((resp) => {
        let couponmsg = resp.data ? resp.data.msg : '对不起，没有找到对应的数据!'
        wx.showModal({
          title: '优惠查询结果',
          content: couponmsg,
          confirmText: '复制',
          success(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: couponmsg,
                success(res) { }
              })
            } else if (res.cancel) {
            }
          }
        })
      }).catch(error => {
        wx.showToast({
          title: '对不起，查询出错！' + error,
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
})

//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      tabbar: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [{
            "pagePath": "/pages/index/index",
            "iconPath": "icon/home.png",
            "selectedIconPath": "icon/home-select.png",
            "text": "首页"
          },
          {
            "pagePath": "/pages/order/order",
            "iconPath": "icon/order.png",
            "selectedIconPath": "icon/order-select.png",
            "text": "订单"
          },
          {
            "pagePath": "/pages/deploy/step01/step01",
            "iconPath": "icon/deploy.png",
            "isSpecial": true,
            "text": "发布"
          },
          {
            "pagePath": "/pages/mall/mall",
            "iconPath": "icon/mall.png",
            "selectedIconPath": "icon/mall-select.png",
            "text": "商城"
          },
          {
            "pagePath": "/pages/mine/mine",
            "iconPath": "icon/mine.png",
            "selectedIconPath": "icon/mine-select.png",
            "text": "我的"
          }
        ]
      }
    }
  }
})

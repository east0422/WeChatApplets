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
  },

  editTabbar: function() {
    let tabbar = this.globalData.tabbar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      if (tabbar.list[i].pagePath == pagePath) {
        tabbar.list[i].selected = true;
      }
    }

    _this.setData({
      tabbar: tabbar
    });
  },

  globalData: {
    tabbar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/main/main",
          "iconPath": "icon/home.png",
          "selectedIconPath": "icon/home-select.png",
          "text": "首页"
        },
        {
          "pagePath": "/pages/index/index",
          "iconPath": "icon/mine.png",
          "selectedIconPath": "icon/mine-select.png",
          "text": "我的"
        }
      ]
    }
  }
})

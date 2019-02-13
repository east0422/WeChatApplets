//app.js
App({
  onLaunch: function () {
  },

  editTabbar: function() {
    let tabbar = this.globalData.tabbar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
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
          "text": "首页",
          "tabIndex": 0
        },
        {
          "pagePath": "/pages/main/main",
          "iconPath": "icon/mine.png",
          "selectedIconPath": "icon/mine-select.png",
          "text": "我的",
          "tabIndex": 1
        }
      ]
    }
  }
})

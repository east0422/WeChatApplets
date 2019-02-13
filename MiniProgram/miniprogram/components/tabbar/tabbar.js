Component({

    properties: {
        tabbar: {
            type: Object,
            value: {
                "backgroundColor": "#ffffff",
                "color": "#979795",
                "selectedColor": "#1c1c1b"
            }
        },
        curtab: {
            type: Number,
            value: 0
        }
    },

    data: {
      showTree: false,
      treeList: [{
          items: ['余额', '订单', '资料', '体现']
        }, {
          items: ['淘宝', '清空']
      }]
    },

    methods: {
        changeTab (event) {
            let tabIndex = event.currentTarget.dataset.tabIndex;
            this.setData({
              curtab: tabIndex,
              showTree: !this.data.showTree
            });
            this.triggerEvent('changeTab', {tabIndex: tabIndex});
        },
        itemTaped (event) {
            this.setData({
              showTree: false
            });
            this.triggerEvent('itemTaped', {itemIndex: event.currentTarget.dataset.itemIndex});
        }
    }
})
// components/mineitem/mineitem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      require: true,
      type: Object,
      default: function () {
        return {
          showdividing: {
            type: Boolean,
            default: false
          },
          showblank: {
            type: Boolean,
            default: false
          }
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
    itemTaped () {
      this.triggerEvent('mineitemtaped', this.data.item)
    }
  }
})

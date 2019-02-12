// pages/main/main.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        qq: '',
        content: '',
        fl_system: '',
        sd_system: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        var user = options.qq;
        var fl_system = options.fl_system;
        var sd_system = options.sd_system;
        console.log(options);
        //  var qq= JSON.parse(options.qq);
        that.setData({ 'qq': user, 'fl_system': fl_system, 'sd_system': sd_system })
        console.log('main onLoad----')

        app.editTabbar();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log('main生命周期函数--监听页面初次渲染完成');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        console.log('main 生命周期函数--监听页面显示');

        var user = this.data.qq;

        if (user) {} //这里user为空 将跳回登录页面

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /*自定义函数*/

    sendMsg: function(e) {

            //console.log(e);
            var msg = e.currentTarget.dataset.type;
            var qq = e.currentTarget.dataset.qq;

            var that = this;
            //console.log(qq);
            if (msg == '发送') {
                msg = that.data.content;
                if (msg == '' || msg == '消息不能为空') {
                    that.setData({ content: '消息不能为空' });
                    return;
                }
            }


            console.log(msg);
            wx.request({
                url: 'http://app.9gola.cn',
                data: { 'qq': qq, 'msg': msg },
                header: {
                    'content-type': 'application/json'
                }, // 默认值
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function(res) {
                    var result = res.data;

                    var result2 = result.replace(/<br \/>/g, '\n');

                    that.setData({ content: result2 })
                    //这里返回成功 需要赋值text里面

                }

            });

            // this.setData({ 'content': res.data });

        } //sendMsg function  
        ,
    bindTextAreaBlur: function(e) {
        this.setData({
            content: e.detail.value
        });

    },

    cancel: function() { this.setData({ content: '' }) },

    reback: function() {
        wx.redirectTo({
            url: '../index/index',
        })
    }
})
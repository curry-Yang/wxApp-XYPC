// mylist.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    disabled:[],
    openId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      success: function () {
        request();
      }
    })
    var that = this;
    app.getUserInfo();
    var openId = app.globalData.openid;
    function request() {
      wx.request({
        url: app.api.mylistApi,
        data: { openId: openId },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success: function (res) {
          wx.hideLoading();
          that.setData({
            array: res.data,
            openId: openId
          });
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  complete: function(e) {
    var that = this;
    var index = e.currentTarget.id;
    that.data.disabled[index] = true;
    that.setData({
      disabled: that.data.disabled
    })
    wx.request({
      url: app.api.completeApi,
      data: { openId: that.data.openId,position:e.currentTarget.dataset.id },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        
      }
    })
  }
})
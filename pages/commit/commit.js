// commit.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo();
  },


  formSubmit: function (e) {
    var _this = this;
    e.detail.value.openId = app.globalData.openid;
    console.log(app.globalData.openid);
    if (e.detail.value.start === '' || e.detail.value.end === '' || e.detail.value.date === '日期' || e.detail.value.time === '时间' || e.detail.value.name === '' || e.detail.value.tel === ''||e.detail.value.checkbox === '') {
      wx.showModal({
        content: '请填写全部信息',
        showCancel:false,
        success: function (res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        }
      })
    }else {
      wx.request({
        url: app.api.commitApi,
        data: e.detail.value,
        method: 'POST',
        header: {
          'content-type': 'application/json;charset=UTF-8'
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          wx.reLaunch({
            url: '../list/list',
          })
        },
        fail: function (){
          wx.showToast({
            title: '提交失败请重新提交',
            duration: 1000
          })
        }
      })
    }
  },
  data: {
    array: [1, 2, 3, 4],
    index: 0,
    date: '日期',
    time: '时间',
    color: '#69b83b'
  },
  bindPickerChange: function (e) {
    this.setData({
      index: parseInt(e.detail.value)
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  read: function () {
    wx.navigateTo({
      url: '../agreement/agreement',
    })
  }
})
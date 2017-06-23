// list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    end:-1,
    flag: true,
    transform:'translateY(-100%)',
    display: 'none'
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
    });
    var that = this;
    var formdata = {position:"-1"};
    function request () {
      wx.request({
        url: app.api.listApi,
        data: formdata,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        success: function (res) {
          wx.hideLoading();
          that.setData({
            array: res.data
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that= this;
    var len = this.data.array.length;
    var formData = {position:this.data.array[len-1]._id};
    console.log(this.data.flag);
    if(this.data.flag) {
      this.setData({
        flag: false
      })
      wx.showLoading({
        title: '加载中',
        success: function () {
          request();
        }
      });
      function request() {
        wx.request({
          url: app.api.listApi,
          data: formData,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          success: function (res) {
            if (Array.isArray(res.data)) {
              var newData = that.data.array.concat(res.data);
              that.setData({
                array: newData,
                flag: true
              });
              wx.hideLoading();
              wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 1000
              });
            } else {
              wx.hideLoading();
              that.setData({
                end: res.data.end,
                flag: false
              })
            }
          }
        })
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: app.api.listApi,
      data: { position: "-1"},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        that.setData({
          array: res.data,
          flag: true
        });
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
          duration: 1000
        });
      }
    })
  },
  call: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  filter: function () {
    console.log(this.data.transform);
    var transform = (this.data.transform == 'translateY(0)')?'translateY(-100%)':'translateY(0)';
    var display = (this.data.display == 'block')?'none':'block';
    console.log(transform);
    this.setData({
      transform: transform,
      display: display
    })
  }
})
//app.js
App({
  api:{
    loginApi: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7f7efce222ef0bd4&secret=8ab1a3ad3b5f08c80131f8c83d5bcc66&grant_type=authorization_code&js_code=',
    commitApi: 'https://www.xiaoyuanpinche.com/XiaoYuanPinChe/SubmitInfo',
    listApi: 'https://www.xiaoyuanpinche.com/XiaoYuanPinChe/ReturnOutInfoData',
    completeApi: 'https://www.xiaoyuanpinche.com/XiaoYuanPinChe/AdjustUserOutInfoState',
    mylistApi: 'https://www.xiaoyuanpinche.com/XiaoYuanPinChe/ReturnUserOutInfoData'
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: that.api.loginApi + res.code,
              data: {
                code: res.code
              },
              success: function (res) {
                that.globalData.openid = res.data.openid;
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    openid: null
  }
})
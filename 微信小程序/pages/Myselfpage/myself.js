// pages/Myselfpage/myself.js
const app = getApp()

Page({
  data: {
    about_text:"关于",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function () {
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  history_information: function(e){
    wx.navigateTo({
      url: '/pages/history_page/history_page',
    })
  },
  favorite_information: function(e){
    wx.navigateTo({
      url: '/pages/favorite_page/favorite_page',
    })
  },
  author_information: function(e){
    wx.navigateTo({
      url: '/pages/author_page/author_page',
    })
  },
  gratuity_information: function(e){
    wx.navigateTo({
      url: '/pages/gratuity_page/gratuity_page',
    })
  },
  download_record: function(e){
    wx.navigateTo({
      url: '/pages/downloadpage/download_record',
    })
  }
})
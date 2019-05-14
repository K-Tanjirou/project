// pages/My_details/my_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:" "
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      id:options.id 
    })
    var url_list = 'http://111.230.49.54:8080/paper/paper/'+this.data.id;
    wx.request({
      url: url_list,
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          paper: res.data.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      },
    })
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
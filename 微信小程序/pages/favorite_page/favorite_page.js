// pages/favorite_page/favorite_page.js
//读取douban.js文件数据,这个require后面的参数是入口文件的文件路径，但是注意必须是相对路径，不能绝对路径

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
    //this.setData方法，指定我们要展示的showJsonList的数据为刚刚我们设置的本地Json数据
    var that = this;
    wx.request({
      url: 'http://111.230.49.54:8080/paper/collection/1',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          showrecordList: res.data.data //设置数据
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

  },

  /**
   * 用户点击card进入内容页面
   */
  detail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/My_details/my_detail?id=' + id
    })
  }
})
// pages/detail/detail.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lwid: '',
    title: '',
    date: '',
    author: '',
    lwContent: '',
    loadingHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lwid: options.lwid,
      title: options.title,
      date: options.date,
      author: options.author,
      lwContent: options.lwContent,
      file:options.file
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
    wx.getStorage({
      key: 'date',
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  ToDownLoad: function () {
    //需要发送的，我估计有用户id，论文id，下载时间，下载标题
    var yhid = 1;//用户id
    var lwid = this.data.lwid;//论文id
    var current_date = util.formatgetDate(new Date());//获取当前日期***
    var current_time = util.formatgetTime(new Date());//获取当前时间***
    var title = this.data.title;//论文标题
    var file = this.data.file;//论文名
    this.setData({
      loadingHidden: false
    })
    let _that = this;
    wx.downloadFile({
      header: {
        'Content-Type': 'application/x-msdownload'
      },
      //下载地址***
      url: 'http://111.230.49.54:8080/paper/file/'+lwid+'/'+file,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        //页面显示加载动画
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            _that.setData({
              loadingHidden: true
            })
            console.log('打开文档成功')
          }
        })
        console.log("wocao sb " + lwid + ":" + current_date + " " + current_time + ":" + title);
        wx.request({
          url: "http://111.230.49.54:8080/paper/downLoad/history",
          method: "POST",
          data: {
            "yhid": 1,//用户id
            "lwid": lwid,//论文id
            "downDate": current_date + " " + current_time,//下载时间
            "title": title
          },
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {//成功，也没什么显示
          }
        })
      }
    })
  }
})
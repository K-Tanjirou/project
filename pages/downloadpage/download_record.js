// pages/downloadpage/download_record.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yhid:" ",
    list:[],              //服务器返回的数据
    spe_time: [],         //具体时间
    downlist: [],      //真正的记录列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://111.230.49.54:8080/paper/downLoad/history/1',
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          showrecordList: res.data.data, //设置数据
          list: res.data.data
        })

        that.set_date()
        that.data.downlist = that.set_newarr(that.data.list)

        console.log(that.data.downlist)
        // console.log(that.data.list)
        // console.log(that.data.downlist.downrecord)

        that.setData({
          list: that.data.list,
          downlist: that.data.downlist
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
   * 点击列表页跳转相应的详情页
   */
  detail: function (event) {
    var lwid = event.currentTarget.dataset.lwid;
    wx.navigateTo({
      url: '/pages/My_details/my_detail?id=' + lwid
    })
  },

  /**
   * 删除
   */
  delete_paper: function(event){
    console.log("----------------------------------------------------")
    var lwid = event.currentTarget.dataset.lwid;
    var yhid = event.currentTarget.dataset.yhid;
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: 'http://111.230.49.54:8080/paper/downLoad/history/del/'+id,
      method: 'DELETE',
      
      success: function (res) {
        that.onLoad();
      },
      fail: function (err) {
        console.log(err)
      },
    })
  },
  /**
   * 清空
   */
  clean: function(event){
    if (this.data.showrecordList[0]){
      var yhid = this.data.showrecordList[0].yhid;
      var that = this;
      wx.request({
        url: 'http://111.230.49.54:8080/paper/downLoad/history/del/all/' + yhid,
        method: 'DELETE',
        success: function (res) {
          console.log(that.data.showrecordList);
          that.onLoad();
        },
        fail: function (err) {
          console.log(err)
        },
      })
    }
  },
  /**
   * 分割请求的日期时间数据
   */
  set_date: function () {

    this.spe_time = this.data.list

    for (var i in this.spe_time) {
      this.spe_time[i].downDate = this.data.list[i].downDate.split(" ")
    }

  },
  /**
     * 新数据结构
     */
  set_newarr: function (list) {

    var downlist = []
    var resdate

    for (var i = 0; i < list.length; i++) {
      //读取每条数据的日期
      resdate = list[i].downDate[0]

      //当日期相同时，传这个数据结构
      var downrecord = {
        "id":       list[i].id,
        "yhid":     list[i].yhid,
        "lwid":     list[i].lwid,
        "time":     list[i].downDate[1],
        "title":    list[i].title
      }

      //当日期不相同时，新建一个Item
      var his_item = {
        "resdate": '',
        "downrecord": []
      }

      his_item.resdate = resdate
      his_item.downrecord.push(downrecord)

      var f = false
      for (var k = 0; k < downlist.length; k++) {
        if (resdate == downlist[k].resdate) {
          downlist[k].downrecord.push(downrecord)
          f = true
          break
        }
      }
      if (!f) {
        downlist.push(his_item)
      }
    }
    return downlist
  }
})
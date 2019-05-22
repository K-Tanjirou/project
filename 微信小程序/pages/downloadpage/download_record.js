// pages/downloadpage/download_record.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yhid:" ",
    showrecordList:[],
    list:[],
    spe_time: [],         //具体时间
    date_l: [],            //日期
    downlist: [],      //真正的记录列表
    resdate: '',       //日期
    downrecord: {},     //历史记录
    his_item: {},      //新的历史纪录
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
        that.set_newarr()

        console.log(that.data.downlist)
        console.log(that.data.list)
        console.log(that.data.downlist[0].downrecord)

        that.setData({
          list: that.data.list,
          downlist: that.downlist
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
      // data:{
      //   "lwid":lwid,
      //   "yhid":yhid
      // },
      success: function (res) {
        console.log(that.data.showrecordList);
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
   * 设置数据
   */
  set_date: function () {

    this.spe_time = this.data.list
    this.date_l = this.data.showrecordList

    for (var i in this.spe_time) {
      this.spe_time[i].downDate = this.data.list[i].downDate.split(" ")
    }

    for (var j in this.date_l) {
      this.date_l[j].downDate = this.data.showrecordList[j].downDate.split(" ")[0]
    }
  },
  /**
     * 新数据结构
     */
  set_newarr: function () {

    this.downlist = this.data.downlist

    for (var i = 0; i < this.data.list.length; i++) {
      //读取每条数据的日期
      this.data.resdate = this.data.list[i].downDate[0]

      //当日期相同时，传这个数据结构
      this.data.downrecord = {
        "id": this.data.list[i].id,
        "yhid": this.data.list[i].yhid,
        "lwid": this.data.list[i].lwid,
        "time": this.data.list[i].downDate[1],
        "title": this.data.list[i].title
      }

      //当日期不相同时，新建一个Item
      this.data.his_item = {
        "resdate": '',
        "downrecord": []
      }

      this.data.his_item.resdate = this.data.resdate
      this.data.his_item.downrecord.push(this.data.downrecord)

      var f = false
      for (var k = 0; k < this.downlist.length; k++) {
        if (this.data.resdate == this.downlist[k].resdate) {
          this.downlist[k].downrecord.push(this.data.downrecord)
          f = true
          break
        }
      }
      if (!f) {
        this.downlist.push(this.data.his_item)
      }
    }
  }
})
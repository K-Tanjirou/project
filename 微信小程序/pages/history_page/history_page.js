// pages/history_page/history_page.js

Page({

  data: {
    showrecordList:[], //服务端返回的数据
    list:[],            //第二份数据
    spe_time:[],         //具体时间
    date_l:[],            //日期
    historylist:[],      //真正的记录列表
    resdate:'',       //日期
    historyrecord:{},     //历史记录
    his_item:{},      //新的历史纪录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.request({
      url: 'http://111.230.49.54:8080/paper/history/1',
      method: 'GET',
      
      success: function (res) {

        console.log(res.data)

        that.setData({
          showrecordList: res.data.data, //设置数据
          list: res.data.data
        })

        that.set_date()
        that.set_newarr()
        
        console.log(that.data.historylist)
        console.log(that.data.list)
        console.log(that.data.historylist[0].historyrecord)

        that.setData({
          list: that.data.list,
          historylist:that.historylist
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
  detail: function(event){
    var lwid = event.currentTarget.dataset.lwid;
    wx.navigateTo({
      url: '/pages/My_details/my_detail?id='+lwid
    })
  },
  /**
   * 删除
   */
  delete_paper: function (event) {
    console.log("----------------------------------------------------")
    var id = event.currentTarget.dataset.id;
    var that = this;
    wx.request({
      url: 'http://111.230.49.54:8080/paper/history/del/'+id,
      method: 'DELETE',
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
  clean: function (event) {
    if (this.data.showrecordList[0]) {
      var yhid = this.data.showrecordList[0].yhid;
      var that = this;
      wx.request({
        url: 'http://111.230.49.54:8080/paper/history/del/all/' + yhid,
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
  set_date:function(){
  
    this.spe_time = this.data.list
    this.date_l = this.data.showrecordList

    for (var i in this.spe_time) {
      this.spe_time[i].browDate = this.data.list[i].browDate.split(" ")
    }

    for (var j in this.date_l) {
      this.date_l[j].browDate = this.data.showrecordList[j].browDate.split(" ")[0]
    }
  },

  /**
     * 新数据结构
     */
  set_newarr: function () {

    this.historylist = this.data.historylist

    for (var i = 0; i < this.data.list.length; i++){
      //读取每条数据的日期
      this.data.resdate = this.data.list[i].browDate[0]

      //当日期相同时，传这个数据结构
      this.data.historyrecord = {
        "id": this.data.list[i].id,
        "yhid": this.data.list[i].yhid,
        "lwid": this.data.list[i].lwid,
        "time": this.data.list[i].browDate[1],
        "title":this.data.list[i].title
      }

      //当日期不相同时，新建一个Item
      this.data.his_item = {
        "resdate":'',
        "historyrecord":[]
      }

      this.data.his_item.resdate = this.data.resdate
      this.data.his_item.historyrecord.push(this.data.historyrecord)

      var f = false
      for (var k = 0; k < this.historylist.length; k++){
        if (this.data.resdate == this.historylist[k].resdate){
          this.historylist[k].historyrecord.push(this.data.historyrecord)
          f = true
          break
        }
      }
      if(!f){
        this.historylist.push(this.data.his_item)
      }
    }
  }
})
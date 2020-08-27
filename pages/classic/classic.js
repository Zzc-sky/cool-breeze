import {
  ClassicModal
} from '../../models/classic.js'
import {
  LikeModal
} from '../../models/like.js'

let classicModal = new ClassicModal()
let likeModel = new LikeModal()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {}, // 最新一起期刊
    first: false, // 是否为第一期
    latest: true, // 是否为最新一期
    likeStatus: false, // 喜欢的状态
    likeCount: 0 // 点赞数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取最新期刊
    classicModal.getLatest((res) => {
      this.setData({
        classic: res,
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
  onLike(event) {
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onLeft() {
    this._updateClassic('next')
  },
  onRight() {
    this._updateClassic('previous')
  },
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index;
    classicModal._getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModal._isLatest(res.index),
        first: classicModal._isFirst(res.index)
      })
    })
  },
  _getLikeStatus(id, type) {
    likeModel.getClassicLikeStatus(id, type, (res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },
})
import BookModal from '../../models/book'
import {
    LikeModal
} from '../../models/like'
const bookModal = new BookModal()
const likeModal = new LikeModal()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookId: "", //书籍ID
        bookDetail: {}, //书籍详情
        comment: [], // 书籍短评
        bookState: false, //点赞情况
        bookCount: 0, // 点赞数
        showPost: false // 控制显示和隐藏post
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading()
        const bookId = options.bid
        const detail = bookModal.getBookDetail(bookId)
        const comments = bookModal.getComment(bookId)
        const likeStatus = bookModal.getBookFavor(bookId)
        Promise.all([detail, comments, likeStatus]).then((res) => {
            wx.hideLoading()
            this.setData({
                bookDetail: res[0],
                comment: res[1].comments,
                bookState: res[2].like_status,
                bookCount: res[2].fav_nums
            })
        })
        // this._getBookDetail()
        // this._getComment()
        // this._getBookFavor()
    },
    // 1.获取书籍详情
    // async _getBookDetail() {
    //     const bookId = this.data.bookId;
    //     const res = await bookModal.getBookDetail(bookId)
    //     this.setData({
    //         bookDetail: res
    //     })
    // },
    // 2.获取书籍短评
    // async _getComment() {
    //     const bookId = this.data.bookId;
    //     const res = await bookModal.getComment(bookId)
    //     this.setData({
    //         comment: res.comments
    //     })
    // },
    // 3.获取书籍点赞情况
    // async _getBookFavor() {
    //     const bookId = this.data.bookId;
    //     const res = await bookModal.getBookFavor(bookId)
    //     this.setData({
    //         bookState: res.like_status,
    //         bookCount: res.fav_nums
    //     })
    // },
    // 4.进行点赞
    onLike(event) {
        const like_or_cancel = event.detail.behavior;
        likeModal.like(like_or_cancel, this.data.bookDetail.id, 400)
    },
    // 5.控制短评框显示
    onFakePost() {
        this.setData({
            showPost: true
        })
    },
    // 6.点击取消按钮关闭短评框
    onCancel() {
        this.setData({
            showPost: false
        })
    },
    // 7.提交短评
    async onPost(event) {
        const comment = event.detail.text || event.detail.value
        if (!comment) {
            return wx.showToast({
                title: '评论内容不能为空',
                icon: 'none'
            })
        }
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }
        await bookModal.postComment(this.data.bookDetail.id, comment)
        wx.showToast({
            title: '+1',
            icon: 'none'
        })
        this.data.comment.unshift({
            content: comment,
            nums: 1
        })
        this.setData({
            comment: this.data.comment,
            showPost: false
        })
    },
})
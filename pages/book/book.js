import BookModal from '../../models/book'
import getRandomNum from '../../utils/random'

const bookModal = new BookModal()

Page({

        /**
         * 页面的初始数据
         */
        data: {
                bookList: [], // 热门书籍列表
                showSearch: false, // 显示隐藏搜索组件
                more: "", // 上拉加载更多
        },
        // 1.获取热门书籍列表
        async _getHotBookList() {
                const res = await bookModal.getHotBookList()
                this.setData({
                        bookList: res
                })
        },
        // 2.点击搜索书籍，显示搜索组件
        onSearch() {
                this.setData({
                        showSearch: true
                })
        },
        // 2.点击取消隐藏搜索组件
        onCancel() {
                this.setData({
                        showSearch: false
                })
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                this._getHotBookList() //  1.获取热门书籍列表
        },
        onReachBottom() {
                this.setData({
                        more: getRandomNum(6)
                })
        }
})
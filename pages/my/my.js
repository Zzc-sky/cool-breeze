import BookModal from '../../models/book'
import {
        ClassicModal
} from '../../models/classic'

const bookModal = new BookModal()
const classicModal = new ClassicModal()

Page({

        /**
         * 页面的初始数据
         */
        data: {
                authorized: false,
                userInfo: {},
                bookCount: 0,
                classic: null
        },

        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                this.userAuthorized()
                this.getMyBookCount()
                this.getMyLikeClassic()
        },
        async getMyBookCount() {
                const res = await bookModal.getMyBookCount()
                this.setData({
                        bookCount: res.count
                })
        },
        getUserInfo(event) {
                const userInfo = event.detail
                if (userInfo) {
                        this.setData({
                                userInfo,
                                authorized: true
                        })
                }
        },
        userAuthorized() {
                wx.getSetting({
                        success: (data) => {
                                if (data.authSetting['scope.userInfo']) {
                                        wx.getUserInfo({
                                                success: (data) => {
                                                        this.setData({
                                                                authorized: true,
                                                                userInfo: data.userInfo
                                                        })
                                                }
                                        })
                                }
                        }
                })
        },
        getMyLikeClassic() {
                classicModal.getMyLikeClassic((res) => {
                        this.setData({
                                classic: res
                        })
                })
        },


})
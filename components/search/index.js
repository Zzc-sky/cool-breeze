import KeywordModal from '../../models/keywords'
import BookModal from '../../models/book'
import paginationBev from '../../behaviors/pagination'

const keywordModal = new KeywordModal()
const bookModal = new BookModal()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more: {
            type: String,
            observer: '_load_more'
        }, // 上拉加载更多
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyList: [], // 历史搜索列表
        hotList: [], // 热门搜索
        showSearch: false, // 显示隐藏历史和热门搜索
        q: '', // 搜索内容,
        loading: false, // 锁，是否正在发送下拉加载更多请求
        loadingCenter: false
    },
    attached() {
        // 读取缓存中的历史搜索记录
        this.setData({
            historyList: keywordModal.getHistory()
        })
        // 获取热门搜索
        this._getHotList()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onCancel() {
            this.triggerEvent('cancel')
        },
        onConfirm(event) {
            this._showLoadingCenter()
            this.initData()
            const q = event.detail.value || event.detail.text // 搜索的关键字
            if (!q) {
                wx.showToast({
                    title: '搜索内容不能为空',
                    icon: "none"
                })
                return
            }
            bookModal.search(0, q).then((res) => {
                this.setMoreData(res.books)
                this.setTotal(res.total)
                keywordModal.addToHistory(q) // 将搜索到的关键字写入缓存
                this.setData({
                    showSearch: true,
                    q
                })
                this._hideLoadingCenter()
            })

        },
        async _getHotList() {
            const res = await keywordModal.getHot()
            this.setData({
                hotList: res.hot
            })
        },
        // 清空输入框
        onDelete() {
            this.setData({
                showSearch: false,
                q: "",
                noneResult: false
            })
        },
        // 上拉加载更多
        _load_more() {
            console.log('上拉加载更多');
            if (this.data.loading) return
            if (this.hasMore()) {
                this._locked()
                bookModal.search(this.getCurrentStart(), this.data.q).then((res) => {
                    this.setMoreData(res.books)
                    this._unLocked()
                }).catch(() => {
                    this.data.loading = false
                })
            }
        },
        // 初始化数据
        initData() {
            this.setData({
                dataArray: [],
                noneResult: false
            })
            this.data.total = null
        },
        _locked() {
            this.setData({
                loading: true
            })
        },
        _unLocked() {
            this.setData({
                loading: false
            })
        },
        _showLoadingCenter() {
            this.setData({
                loadingCenter: true
            })
        },
        _hideLoadingCenter() {
            this.setData({
                loadingCenter: false
            })
        }
    }
})
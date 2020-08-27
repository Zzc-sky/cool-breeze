import {
    Http
} from '../api/request-promise'

export default class KeywordModal extends Http {
    key = "h-record"
    maxLength = 10
    // 历史搜索
    getHistory() {
        return wx.getStorageSync(this.key) || []
    }
    // 热门搜索
    getHot() {
        return this.request({
            url: "/book/hot_keyword"
        })
    }
    // 搜索书籍写入缓存
    addToHistory(keyword) {
        let words = this.getHistory()
        const has = words.includes(keyword)
        if (!has) {
            if (words.length >= this.maxLength) {
                words.pop()
            }
            words.unshift(keyword)
            wx.setStorageSync('h-record', words)
        }
    }
}
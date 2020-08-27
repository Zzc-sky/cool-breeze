import {
    Http
} from '../api/request.js'

export class ClassicModal extends Http {
    // 1.获取最新期刊
    getLatest(callback) {
        this.request({
            url: "/classic/latest",
            success: (res) => {
                callback(res)
                this._setLatestIndex(res.index)
                // 将最新期刊写入缓存
                let key = this._getKey(res.index)
                wx.setStorageSync(key, res)
            }
        })
    }

    // 2.获取上一期期刊
    getPrevious(index, callback) {
        this.request({
            url: `/classic/${index}/previous`,
            success: (res) => {
                callback(res)
            }
        })
    }

    // 获取上一期或者下一期期刊
    _getClassic(index, nextOrPrevious, callback) {
        let key = nextOrPrevious == "next" ? this._getKey(index + 1) : this._getKey(index - 1)
        let classic = wx.getStorageSync(key);
        if (!classic) {
            this.request({
                url: `/classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res)
                    callback(res)
                }
            })
        } else {
            callback(classic)
        }
    }

    // 获取我喜欢的期刊
    getMyLikeClassic(callback) {
        this.request({
            url: '/classic/favor',
            success: (res) => {
                callback(res)
            }
        })
    }

    // 判断是否是第一期期刊
    _isFirst(index) {
        return index == 1 ? true : false
    }
    // 判断是否是最新的期刊
    _isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return index == latestIndex ? true : false
    }
    // 保存缓存最新期刊号
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    // 读取缓存中的最新期刊号
    _getLatestIndex() {
        return wx.getStorageSync('latest')
    }
    // 
    _getKey(index) {
        return 'classic-' + index
    }
}
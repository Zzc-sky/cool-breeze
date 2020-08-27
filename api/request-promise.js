import config from './config.js'

const tips = {
        1: '抱歉,出现了一个错误',
        1005: 'appkey无效，请前往www.7yue.pro申请',
        3000: '期刊不存在'
}

export class Http {
        request({
                url,
                data = {},
                method = "GET"
        }) {
                return new Promise((resolve, reject) => {
                        wx.request({
                                url: config.baseUrl + url,
                                method,
                                data,
                                header: {
                                        'content-type': 'application/json',
                                        appkey: config.appkey
                                },
                                success: (res) => {
                                        let code = res.statusCode + ''
                                        if (code.startsWith('2')) {
                                                resolve(res.data)
                                        } else {
                                                reject()
                                                let error_code = res.data.error_code
                                                this._show_error(error_code)
                                        }
                                },
                                fail: () => {
                                        reject()
                                        this._show_error(1)
                                }
                        })
                })
        }
        _show_error(error_code) {
                if (!error_code) {
                        error_code = 1
                }
                const tip = tips[error_code]
                wx.showToast({
                        title: tip ? tip : tips[1],
                        icon: 'none',
                        duration: 2000
                })
        }
}
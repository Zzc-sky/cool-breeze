import {
    Http
} from '../api/request-promise'

export default class BookModal extends Http {
    // 1.获取热门书籍
    getHotBookList() {
        return this.request({
            url: '/book/hot_list'
        })
    }
    // 2.获取书籍详细信息
    getBookDetail(id) {
        return this.request({
            url: `/book/${id}/detail`
        })
    }
    // 3.获取书籍短评
    getComment(id) {
        return this.request({
            url: `/book/${id}/short_comment`
        })
    }
    // 4.获取书籍点赞情况
    getBookFavor(id) {
        return this.request({
            url: `/book/${id}/favor`
        })
    }
    // 5.新增短评
    postComment(id, content) {
        return this.request({
            url: '/book/add/short_comment',
            method: 'POST',
            data: {
                book_id: id,
                content
            }
        })
    }
    // 6.书籍搜索
    search(start, q) {
        return this.request({
            url: "/book/search?summary=1",
            data: {
                start,
                q
            }
        })
    }
    // 7.获取喜欢书籍数量
    getMyBookCount() {
        return this.request({
            url: '/book/favor/count'
        })
    }
}
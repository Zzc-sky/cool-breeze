import {
    Http
} from '../api/request'

export class LikeModal extends Http {
    like(behavior, art_id, type) {
        let url = behavior == "like" ? "/like" : "/like/cancel"
        this.request({
            url,
            method: "POST",
            data: {
                art_id,
                type
            }
        })
    }

    getClassicLikeStatus(id, type, callback) {
        this.request({
            url: `/classic/${type}/${id}/favor`,
            success: (res) => {
                callback(res)
            }
        })
    }
}
// components/like/like.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean
        },
        count: {
            type: Number
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesSrc: '/assets/images/like/like.png',
        noSrc: '/assets/images/like/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(event) {
            let count = this.data.count;
            let like = this.data.like;
            count = like ? --count : ++count;
            this.setData({
                count,
                like: !like
            })
            let behavior = this.properties.like ? "like" : "cancel"
            this.triggerEvent("like", {
                behavior
            })
        }
    }
})
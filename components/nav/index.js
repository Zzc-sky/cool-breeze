// components/nav/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        first: Boolean,
        latest: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        leftYesSrc: "/assets/images/nav/left_yes.png",
        leftNoSrc: '/assets/images/nav/left_no.png',
        rightYesSrc: "/assets/images/nav/right_yes.png",
        rightNoSrc: "/assets/images/nav/right_no.png"
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 向左点击
        onLeft() {
            if (!this.properties.latest) {
                this.triggerEvent("left")
            }
        },
        // 向右点击
        onRight() {
            if (!this.properties.first) {
                this.triggerEvent("right")
            }
        }
    }
})
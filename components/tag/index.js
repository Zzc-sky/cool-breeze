// components/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true, // 开启slot插槽
    },
    externalClasses: ['tag-class'], // 添加自定义外部样式
    properties: {
        text: String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap() {
            this.triggerEvent('tapping', {
                text: this.properties.text
            })
        }
    }
})
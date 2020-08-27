import {
    classicBeh
} from '../classic-beh'

const musicMgr = wx.getBackgroundAudioManager()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [classicBeh],
    properties: {
        src: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        yesPlay: "/assets/images/music/player@play.png",
        noPlay: "/assets/images/music/player@pause.png",
        playing: false // 控制音乐播放图片
    },
    attached() {
        this._recoverState()
        this._monitorSwitch()
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPlay() {
            // 1.当前没有播放音乐
            if (!this.data.playing) {
                musicMgr.src = this.properties.src
                musicMgr.title = this.properties.title
                this.setData({
                    playing: true
                })
            } else {
                this.setData({
                    playing: false
                })
                musicMgr.pause()
            }
        },
        // 恢复音乐播放状态 
        _recoverState() {
            if (musicMgr.paused) {
                this.setData({
                    playing: false
                })
                return
            }
            if (musicMgr.src == this.properties.src) {
                this.setData({
                    playing: true
                })
            }
        },
        // 音乐控制器控制播放音乐图标
        _monitorSwitch() {
            musicMgr.onPlay(() => {
                this._recoverState()
            })
            musicMgr.onPause(() => {
                this._recoverState()
            })
            musicMgr.onStop(() => {
                this._recoverState()
            })
            musicMgr.onEnded(() => {
                this._recoverState()
            })
        }
    }
})
const paginationBev = Behavior({
    data: {
        dataArray: [],
        total: 0,
        noneResult: false
    },
    methods: {
        setMoreData(dataArray) {
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },
        // 返回起始的记录数
        getCurrentStart() {
            return this.data.dataArray.length
        },
        // 返回的总数据数量
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },
        // 是否还有更多的数据需要加载
        hasMore() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
        }
    }
})

export default paginationBev
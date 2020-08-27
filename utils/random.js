const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default function getRandomNum(n) {
    var num = ""
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35)
        num = num + nums[id]
    }
    return num
}
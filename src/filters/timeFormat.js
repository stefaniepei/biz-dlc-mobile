export const normalTime = (time) => {
    if (time) {
        let oDate = new Date()
        oDate.setTime(time)
        let y = oDate.getFullYear()
        let month = oDate.getMonth() + 1
        let d = oDate.getDate()
        let h = oDate.getHours()
        let m = oDate.getMinutes()
        let s = oDate.getSeconds()
        return y + '-' + month + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
}

export const dateFormat = (timeString) => {
    let formatString = String(timeString).split('T')
    return formatString[0]
}

export const dateTimeFormat = (timeString) => {
    let formatString = String(timeString).replace('T', ' ')
    return formatString
}
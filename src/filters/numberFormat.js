//将数值转换为万元
export const toMillion = num => {
    if (Number.isNaN(num)) return 0
    return (Number.parseInt(num) / 10000).toFixed(0)
}

//将数值四舍五入(保留2位小数)后格式化成金额形式
//@precision 精度
export const formatCurrency = (num, precision = 2, keep0cents = false) => {
    if (Number.isNaN(num)) return 0
    let pre = Math.pow(10, precision)
    num = num + ''
    num = num.replace(/\$|\,/g, '')
    if (isNaN(num))
        num = "0"
    let sign = (num == (num = Math.abs(num)))
    num = Math.floor(num * pre + 0.50000000001)
    let cents = num % pre
    num = Math.floor(num / pre) + ''
    if (cents == 0) {
        cents = keep0cents ? ".00" : ""
    } else if (cents < 10) {
        cents = ".0" + cents
    } else {
        cents = "." + cents
    }
    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3))
    return (((sign) ? '' : '-') + num + cents)
}

//将金额形式转换成数字形式
export const currencyToNormal = stringNum => {
    return stringNum.replace(/[^\d\.-]/g, "")
}

//把不是数字的当0返回
export const naN = num =>{
    if (Number.isNaN(num)) return 0
    return num
}
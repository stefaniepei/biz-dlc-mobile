//获取最后几位字符
export const lastChar = (str, length = 4) => {
    str = String(str)
    return str.substring(str.length - length)
}

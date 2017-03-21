export const testMinAddAmount = (amount, minAddAmount) => {
    let result = false
    if (Number.parseFloat(amount) % Number.parseFloat(minAddAmount) == 0) {
        result = true
    }
    return result
}

export const testAccountName = (accountName) => {
    let name = accountName.toString()
    let reg = /^1[3|4|5|7|8][0-9][A-Za-z0-9]{4}[0-9]{4}$/
    let result = reg.test(name)
    return result
}

export const testPassword = (password) => {
    let pwd = password.toString()
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
    let result = reg.test(pwd)
    return result
}

//请用testAccountName,这个暂时用不到
export const testUserName = (userName) => {
    let name = userName.toString()
    let reg = /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,20}$/
    let result = reg.test(name)
    return result
}

export const testCaptcha = (captcha) => {
    let cap = captcha.toString()
    let reg = /^.{4}$/
    let result = reg.test(cap)
    return result
}

export const testOtpCode = (otpNo) => {
    let otp = otpNo.toString()
    let reg = /^[0-9]{6}$/
    let result = reg.test(otp)
    return result
}

export const testTradePassword = (tradePw) => {
    let pwd = tradePw.toString()
    let reg = /(((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*?[@!#$%^&*()_+\.\-\?<>'|=])(?=.*[0-9]))|((?=.*?[@!#$%^&*()_+\.\-\?<>'|=])(?=.*[a-zA-Z]))).{8,16}$/
    let result = reg.test(pwd)
    return result
}

export const testBankPhone = (phoneNo) => {
    let phone = phoneNo.toString()
    let reg = /^1[3|4|5|7|8][0-9]{9}$/
    let result = reg.test(phone)
    return result
}

export const testBankNO = (bankName, bankNum) => {
    //银行卡号验证规则
    let bankNumRule = /^\d{16}|\d{19}|\d{17}|\d{18}$/
    if ($.trim(bankNum) == "" || bankNum == null) {
        return false
    } else if (!bankNumRule.test(bankNum)) {
        return false
    }
    return true
}

export const testIDCard = (idCard) => {
    //15位和18位身份证号码的正则表达式
    let regIdCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        //判断前2位合法性
        let aCity = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江 ",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北 ",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏 ",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        if (aCity[parseInt(idCard.substr(0, 2))] == null) return false
        //将前17位加权因子保存在数组里
        let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        //这是除以11后，可能产生的11位余数、验证码，也保存成数组
        let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2)
        //用来保存前17位各自乖以加权因子后的总和
        let idCardWiSum = 0
        for (let i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
        }
        //计算出校验码所在数组的位置
        let idCardMod = idCardWiSum % 11
        //得到最后一位身份证号码
        let idCardLast = idCard.substring(17);
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
                return true
            } else {
                return false
            }
        } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
                return true
            } else {
                return false
            }
        }
    } else {
        return false
    }
}
export const productDict = (val, dictType) => {
    let obj = val + ''
    return productDictData[dictType][obj]
}

export const accountDict = (val, dictType) => {
    let obj = val + ''
    return accountDictData[dictType][obj]
}

//标的
const productDictData = {
    prodType: {
        '0': '体验金',
        '1': '优信贷',
        '2': '节节升息'
    },
    prodStatus: {
        '1': '立即投资', //募集中
        '2': '已售罄',
        '3': '还款中',
        '4': '已流标',
        '7': '已兑付'
    },
    interestTypeList: {
        '0': '到期一次性还本付息',
        '1': '按年付息，到期还本付息',
        '2': '按半年付息，到期还本付息',
        '3': '按季付息，到期还本付息',
        '4': '按月付息，到期还本付息'
    },
}
//账户
const accountDictData = {
    orderStatus: {
        '0': '未支付',
        '1': '已支付',
        '2': '支付失败',
        '3': '已过期',
        '4': '已支付',
        '5': '已支付',
        '6': '已支付',
        '7': '已退款',
        '8': '已支付',
        '9': '已支付',
        '10': '已支付',
        '11': '支付中',
    },
    productStatus: {
        '1': '募集中',
        '2': '已售罄',
        '3': '还款中',
        '4': '已流标',
        '5': '已兑付'
    },
    tradeStatus: {
        '0': '未交易',
        '1': '交易处理中',
        '2': '交易成功',
        '3': '交易失败'
    },
}

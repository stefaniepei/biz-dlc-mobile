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
        '1': '募集中',
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
        '1': '募集中',
        '2': '已售罄',
        '3': '还款中',
        '4': '已流标',
        '5': '交易失败',
        '6': '产品募集中',
        '7': '已兑付',
        '8': '持有中',
        '9': '赎回中',
        '10': '已赎回'
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
    }
}
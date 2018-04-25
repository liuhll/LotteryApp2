const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    lotteryInfo: state => state.user.lotteryInfo,
    orderNo: state => state.operationData.orderNo
}

export default getters;
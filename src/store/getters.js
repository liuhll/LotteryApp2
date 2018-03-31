const getters = {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    lotteryInfo: state => state.user.lotteryInfo
}

export default getters;
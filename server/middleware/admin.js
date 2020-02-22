let admin = (req,res,next) => {
    if(req.user.role === 0 ){
        return res.send('관리자만 사용 할수 있는 기능입니다.')
    }
    //if you want to make more roles
    // if(req.user.role === 1   ){
    //     return res.send('you are not allowed, get out now')
    // }
    next()

}

module.exports = { admin }
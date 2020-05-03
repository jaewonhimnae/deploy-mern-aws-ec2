let admin = (req,res,next) => {
    if(req.user.role === 0 ){
        return res.send('Only admin user can do this')
    }
    //if you want to make more roles
    // if(req.user.role === 1   ){
    //     return res.send('you are not allowed, get out now')
    // }
    next()

}

module.exports = { admin }
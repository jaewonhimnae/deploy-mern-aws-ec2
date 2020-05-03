const moment = require('moment');
const { User } = require('../models/user');

let auth = (req, res, next) => {
  const token = req.header('x_token');
  const tokenExp = req.header('x_tokenExp');
  
  var now = moment().valueOf();
  User.findByToken(token, (err, user) => {

    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    if (tokenExp < now) return res.json({
      isAuth: false, error: true
    })

    req._id = user._id;
    req.tokenExp = tokenExp;
    req.token = token;
    req.user = user;
    next()
  });
};

module.exports = { auth };

const { User } = require('../models/user');
const moment = require("moment");
var store = require('store')

let auth = (req, res, next) => {
  // let token = req.cookies.w_auth;
  // let tokenExp = req.cookies.w_authExp;
  // let token = store.get('w_auth') && store.get('w_auth').name;
  // let tokenExp = store.get('w_authExp') && store.get('w_authExp').name;
  let token = req.query.token;
  let tokenExp = req.query.tokenExp;

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

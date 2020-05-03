const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        minglength: 5
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: String,
    tokenExp: Number,
    resetToken: String,
    resetTokenExp: Number
})
//role === 1   normal user 
//role === 0   admin user

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {

        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

userSchema.methods.generateResetToken = function (cb) {
    var user = this;

    crypto.randomBytes(20, function (err, buffer) {
        var token = buffer.toString('hex');
        var today = moment().startOf('day').valueOf();
        var tomorrow = moment(today).endOf('day').valueOf();

        user.resetToken = token;
        user.resetTokenExp = tomorrow;
        user.save(function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};


const User = mongoose.model('User', userSchema);

module.exports = { User }
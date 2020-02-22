const express = require('express');
const router = express.Router();
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");
//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        company: req.user.company
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        console.log(doc)
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ account: req.body.account }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, account not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({
                    loginSuccess: true, userId: user._id,
                    tokenExp: user.tokenExp, token: user.token,
                    company: user.company
                });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;

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

router.post("/register", async (req, res) => {

    const user = new User(req.body);
    try {
        await user.save()
        return res.status(200).json({
            success: true
        });
    } catch (err) {
        console.log(err)
    }
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
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
                    loginSuccess: true,
                    userId: user._id,
                    tokenExp: user.tokenExp,
                    token: user.token
                });
            });
        });
    });
});

router.get("/logout", auth, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" })
        return res.status(200).send({
            success: true
        });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;

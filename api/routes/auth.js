const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken')

const router = express.Router();

const salt= bcrypt.genSaltSync(10);
const secret = "teycnnbvmannfhjj445687848Q09485776QHN";

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt)})
        res.json(userDoc)
    } catch (e) {
        res.status(400).json(e)
    }
})
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = User.findOne({username})
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // loggin
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token)=> {
            if(err) throw err
            res.cookie('token', token).json({
                id:userDoc._id,
                username: userDoc.username
            })
        })
    }else {
        res.status(400).json("Bad credentials");
    }
    res.json(passOk)
})

router.get('/profile', async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err
        res.json(info)
    })
});

router.post('logout', async (req, res) => {
    res.cookie('token', '').json('ok')
})

module.exports = router;
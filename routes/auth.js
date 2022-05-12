const express = require('express')
const router = express.Router()
const authcontroller=require("../controllers/authcontroller")
const authjwt = require("../middlewares/authjwt")

router.get('/signup', (req, res) => {
    res.render("./home/custsignup.ejs",{err:undefined})
})

router.get('/signup/logistic', (req, res) => {
    res.render("./home/logsignup.ejs",{err:undefined})
})

router.post('/signup/logistic',authcontroller.signupLogistic)

router.post('/signup/customer',authcontroller.signupCustomer)

router.get('/login', (req, res) => {
    res.render("./home/login.ejs",{err:null})
})

router.post('/login',authcontroller.login)

router.get('/welcome',authjwt.verifyToken,(req,res)=>{
    res.render("./home/welcome.ejs")
})

router.get('/forget-password', (req, res) => {
    res.render("./home/forget_password",{err:null})
})

router.post('/forget-password',authcontroller.forgetPassword )
// Amitnagdev@gmail.com
router.get('/password-reset/:token',(req,res)=>{
    res.render('./home/password_reset',{token:req.params.token,err:null})
})

router.post('/password-reset/:token',(req,res)=>authcontroller.password_reset(res,req,req.params.token.slice(1)))


module.exports = router
const express = require('express')
const app = express()
const port = 3000
const mongoose=require("mongoose")
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb connection
const mongo=require("./config/dbconfig")
mongo.connect()

// router handles
const homeroutes=require("./routes/home")
const authroutes=require("./routes/auth")
const orderroutes=require("./routes/order")

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/',homeroutes)
app.use('/',authroutes)
app.use('/',orderroutes)

app.get('/',(req,res)=>{
    res.render("./home/index.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
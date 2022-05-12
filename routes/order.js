const express = require('express')
const router = express.Router()

router.get('/order', (req, res) => {
    res.render("./home/index.ejs")
})

module.exports = router
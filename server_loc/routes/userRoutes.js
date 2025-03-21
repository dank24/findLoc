const express = require('express')
const router = express.Router()
const userCont = require('../controllers/userCont')

router.post('/createUser', userCont.createUser)
router.get('/login/:userName', userCont.login)
router.post('./upduserinfo/:userId', userCont.updUserInfo)


module.exports = router
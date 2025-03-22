const express = require('express')
const router = express.Router()
const userCont = require('../controllers/userCont')

router.post('/createUser', userCont.createUser)
router.get('/login/:userName', userCont.login)
router.get('/getuserData/:userId', userCont.getUserData)
router.put('/upduserinfo/:userId', userCont.updUserInfo)


module.exports = router
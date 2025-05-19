const express = require('express')
const router = express.Router()
const userCont = require('../controllers/userCont')
const dataCont = require('../controllers/dataCont')

router.post('/createUser', userCont.createUser)
router.get('/login/:logindata', userCont.login)
router.get('/getuserData/:userId', userCont.getUserData)
router.put('/upduserinfo/:userId', userCont.updUserInfo)

/* router.get('/d', dataCont.getData)
 */
module.exports = router
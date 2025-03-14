const express = require('express')
const router = express.Router()
const userCont = require('../controllers/userCont')

router.post('/createUser', userCont.createUser)


module.exports = router
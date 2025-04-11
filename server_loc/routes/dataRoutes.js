const express = require('express')
const router = express.Router()
const dataCont = require('../controllers/dataCont')

router.post('/storedata/:data?', dataCont.storeData)


module.exports = router
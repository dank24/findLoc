const express = require('express')
const router = express.Router()
const dataCont = require('../controllers/dataCont')

router.post('/storedata/', dataCont.storeData) 
router.post('/storelocal', dataCont.storeLocal)

router.get('/getdata', dataCont.getData)  

 
module.exports = router
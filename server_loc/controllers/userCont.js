const usermodel = require('../models/userModel')
const userModel = require('../models/userModel')
const asyncHandler = require('express-async-handler')

exports.createUser = asyncHandler(
    async(req, res, next) => {
        let obj = await req.body
        console.log(obj)
    }
) 
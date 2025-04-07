const asyncHandler = require('express-async-handler')
const secureModel = require('../models/secureModel')

exports.storeHash = asyncHandler(
    async(req, res) => {
        let userId = await req.id

        try {
            if(!userId){
                //
            }
        } catch (error) {
            
        }
    }
)
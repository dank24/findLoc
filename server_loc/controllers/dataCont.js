const asyncHandler = require('express-async-handler')
const secureModel = require('../models/dataModel')
const dataModel = require('../models/dataModel')

exports.storeData = asyncHandler(
    async(req, res) => {

         let {category, name, lat, lng } = req.body

         name = name.toLowerCase( )

        let locData = await dataModel.findOne({name: name}) 

        console.log(name)

         try {
            if(!locData){
                let newLocData = {
                    category,
                    name,
                    lat,
                    lng
                }

                let s = new dataModel(newLocData)
                await s.save()

                res.status(200).json({message: 'location saved', status: 'success', action: 'saved location' })

            }

            if(locData){
                res.status(401).json({message: 'location data already exist', status: 'failure', action: 'duplicate location data'})
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({error: error.message, status: 'failure', action: 'failed to save location'})
        }  
    }
)
const asyncHandler = require('express-async-handler')
const dataModel = require('../models/dataModel')
const usermodel = require('../models/userModel')
const fs = require('fs')
const path = require('path')

exports.storeData = asyncHandler(
    async(req, res, next) =>{
        let {category, name, lat, lng,  } = req.body
        name.toLowerCase()
        let dat = JSON.stringify(req.body)

        let check = await dataModel.findOne({name: name})

         try {
            if(!check){
                let obj = {
                    category, name, lat, lng
                }
                let uplLoc = new dataModel(obj)
                await uplLoc.save()

                res.status(200).json({message: 'Location uploaded successfully', status: 'ok', data: uplLoc})
            }
            
            if(check){
                res.status(409).json({message: 'location exists', status: 'failure'})
            }
        } catch (error) {
            res.status(400).json({message: error.message, status: 'failure'})
        } 
    }
)

exports.getData = asyncHandler(
    async(req, res , next) =>{

        let userCount = await usermodel.countDocuments()
        let locCount = await dataModel.countDocuments()

        try {
            if(userCount){
                res.status(200).json({message: 'success', userCount})
            } else {
                res.status(400).json({message: 'failure', userCount})
            }
        } catch (error) {
            res.status(400).json({error})
        }
      
    }
)

exports.storeLocal = asyncHandler(
   async (req, res) => {
        let rData = req.body
        console.log(rData)

        let file2 = path.join(__dirname, '../../client_loc/src/assets/locs2.js')
        const data = require(file2)
        let {lodges, TempSite, PermSite, admin} = data.places

        function updData(cate, arr) {
            let useName = uppercase(rData.name)
         
            let obj = {
                name: useName,
                lat: rData.lat,
                lng: rData.lng,
            }
            console.log(obj)
             if(rData.category == cate){
               let check = arr.some(it => it.name == useName)
               if(!check){
                arr.push(obj)
               }    
               
            let obj1 = {
                admin: [...admin],
                lodges: [...lodges],
                PermSite: [...PermSite],
                TempSite: [...TempSite],
            }     
            
            let write = `export const places = {
                admin: ${JSON.stringify(obj1.admin)},
                lodges: ${JSON.stringify(obj1.lodges)}, 
                PermSite: ${JSON.stringify(obj1.PermSite)}, 
                TempSite: ${JSON.stringify(obj1.TempSite)}, 
                    }                                        `

            fs.writeFileSync(file2, write,)

            } 
        }

        function uppercase(str){
            let reString = str[0].toUpperCase()
            let useString = str.substring(1)

            for(let c = 0; c < useString.length; c++) {
                if(useString[c - 1] == ' ') {
                    reString += useString[c].toUpperCase()
                } else {
                    reString += useString[c]
                }
            }

            return reString
        }
 
        updData('lodges', lodges)
        updData('tempsite', TempSite)
        updData('permsite', PermSite)
        updData('admin', admin) 
    }
)





const usermodel = require('../models/userModel')
const asyncHandler = require('express-async-handler')

exports.createUser = asyncHandler(
    async(req, res, next) => {
        let {userName, userMail, userPass, conPass} = await req.body
            let name = userName.toLowerCase()
            let mail = userMail.toLowerCase()
        console.log(name, mail)

        let user = await usermodel.findOne({userName: name})

        if(user){
            return res.status(409).json({message: 'user exist', action: 'failed to created new user', status: 'failure'})
        }
        if(!user){

            try {
                let newUser = new usermodel({
                    userName: name,
                    userEmail: mail,
                    savedLocations: [],
                    userHistory: [],
                })

                await newUser.save()
                console.log(newUser)
                return res.status(200).json({message: 'user created', action: 'created user', status: 'success'})
                
            } catch (error) {
                return res.status(400).json({message: error.message, action: 'error', status: 'failure'})
            }
           
        }
    }
) 

exports.login = asyncHandler(
    async(req, res, next)=> {
        
        let userName = req.params.userName

            let name = userName.toLowerCase()
            //let mail = userMail.toLowerCase()
        let user = await usermodel.findOne({userName: name}) 

        try {
            if(user){
                return res.status(200).json({message: 'user found', action: 'logged in', status: 'success', data: user})
            }
            if(!user){
                return res.status(400).json({message: 'user not found', action: 'not logged in', status: 'failure'})
            }

        } catch (error) {
            return res.status(400).json({message: error.message, action: 'error', status: 'failure'})
        }

        
    }
)

exports.updUserInfo = asyncHandler(
    async(req, res, next) => {
        let userId = await req.params.userId
    }
)
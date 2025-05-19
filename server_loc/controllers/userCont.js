const usermodel = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { use } = require('../routes/dataRoutes')

exports.createUser = asyncHandler(
    async(req, res, next) => {
        let {userName, userMail, userPass, salt} = await req.body
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
                    userPass: userPass,
                    salt: salt,
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
        
        let {userName, userPass} = await JSON.parse(req.params.logindata)
        console.log(userName, userPass)

            let name = userName.toLowerCase()
            //let mail = userMail.toLowerCase()
        let user = await usermodel.findOne({userName: name}) 

        let isValidPass = await bcrypt.compare(userPass, user.userPass)
        console.log(isValidPass)

        try {
            if(user && isValidPass){
                
                return res.status(200).json({message: 'user found', action: 'logged in', status: 'success', data: user})
            }
            if(!user){
                return res.status(400).json({message: 'user not found', action: 'not logged in', status: 'failure'})
            }
            if(!isValidPass){
                res.status(401).json({message: 'invalid credential', status: 'failure', action: 'data incorrect'})
            }

        } catch (error) {
            return res.status(400).json({message: error.message, action: 'error', status: 'failure'})
        }

        
    }
)

exports.updUserInfo = asyncHandler(
    async(req, res, next) => {
        let userId = req.params.userId
        let rData = await req.body

        function handleFave(lis, datrm){
            let check = lis.some(it => it === datrm)
            if(check){
                let i = lis.findIndex(it => it === datrm)
                lis.splice(i, 1)

                return lis
            } else {
                lis.push(datrm)
                return lis
            }
        }
        function handleHistory(arr, data){

            let useArr;
            let check = arr.some(it => it.name === data.name)
            if(check){
                let i = arr.findIndex(it => it.name === data.name)
                arr.splice(i, 1)

                useArr = [data, ...arr]
                useArr = useArr.splice(0, 4)
            } else {
                useArr = [data, ...arr]
                useArr = useArr.splice(0, 4)
            }
            return useArr
        }

         let user = await usermodel.findOne({_id: userId})

         try {
            if(rData.name == 'faves' && user){
                let userFaves = user.savedLocations
                let useArr = handleFave(userFaves, rData.data)

                await usermodel.updateOne({_id: userId},
                {$set: {savedLocations: useArr}}
                )      
                return res.status(200).json({message: 'favorites updated', status: 'success', data: user})
            }

            if(rData.name == 'history' && user){
                let userHistory = user.userHistory
                let useArr = handleHistory(userHistory, rData.data)

                console.log(useArr)
                await usermodel.updateOne({_id: userId},
                    {$set: {userHistory: useArr}}
                )
                return res.status(200).json({message: 'history updated', status: 'success'})
            }
        } catch (error) {
            return res.status(400).json({message: error.message, action: 'error', status: 'error'})
        }  
        
    }
)

exports.getUserData = asyncHandler(
    async (req, res, next) =>{
        let userId = await req.params.userId
        
        let user = await usermodel.findOne({_id: userId})

        try {
            if(user){
                let sData = {
                    userName: user.userName,
                    userName: user.userEmail,
                    userHistory: user.userHistory,
                    savedLocations: user.savedLocations,
                }
                return res.status(200).json({message: 'user found', data: sData, status: 'success'})
            }
             if(!user){
                return res.status(400).json({message: 'user not found', status: 'failure'})
            }
        } catch (error) {
            return res.status(400).json({message: error.message, status: 'failure'})
        }
    }
)


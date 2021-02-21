const updateUserService = require('../services/updateUser')
module.exports = {
    update: async (req, res) => {
        const {body, user} = req

        //update user
        const updateUser = {
            ...body
        }

        try{
            const saveUpdateUser = await updateUserService.update(updateUser, {_id: user._id})
            res.send({status: 200,message: saveUpdateUser})
        }catch(err){
            res.status(400).json({error: err.message})
        }
    },
    upload: async (req,res) => {
        const {file,user} = req
        // console.log(req, "ini req upload")
        const uploadFile = file.location
        try {
            const uploadProfile = await updateUserService.upload(user._id, uploadFile)
            res
            .status(200)
            .send({message: "Upload photo success", data: uploadProfile})
        } catch (err) {
            res.status(400).json({error: err.message})
        }
    }
}
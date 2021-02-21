const model = require("../model")
const bcrypt = require("bcrypt")

module.exports = {
    update: async (updateUser, userId) => {
        try{
            const user = await model.userModel
            .findByIdAndUpdate(userId, updateUser)
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(updateUser.password, salt)
            await user.save()
            return "update success"
        }catch(err){
            throw err.message
        }     
    },
    upload: async (userId, uploadProfile) => {
        return await model.userModel.findByIdAndUpdate(
            userId,
            {photo: uploadProfile},
            {new: true}
        )
    }
}
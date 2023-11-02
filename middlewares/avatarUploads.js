const uploader = require("../utilities/singleFileUploads")

const avatarUpload = (req,res,next)=>{
    const upload = uploader('avatars',1000000,['image/jpeg','image/jpg','image/png'],'only jpeg,png,jpg are allowed')
    upload.any()(req,res,(err)=>{
        if(!err) next()
        else{
            console.log(err);
            res.status(500).json({
            errors:{
                avatar:{
                    msg:err.message
                }
            }
        })}
    })
}

module.exports = avatarUpload
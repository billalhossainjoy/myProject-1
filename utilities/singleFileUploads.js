const createHttpError = require("http-errors")
const multer = require("multer")
const path = require('path')

const uploader = (subFolder,fileSize,supportedtype,errorMsg) => {
    const folderlocation = path.join(__dirname,`../public/uploads/${subFolder}`)
    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,folderlocation)
        },
        filename:(req,file,cb)=>{
            fileExt = path.extname(file.originalname)
            fileName = file.originalname.replace(fileExt,'').toLowerCase().split(" ").join('-')+"-"+Date.now()
            cb(null,fileName+fileExt)
        }
    })
    const upload = multer({
        storage,
        fileSize:fileSize,
        fileFilter:(req,file,cb)=>{
            if(supportedtype.includes(file.mimetype))cb(null,true)
            else cb(createHttpError(errorMsg))
        }
    })
    return upload
}

module.exports = uploader

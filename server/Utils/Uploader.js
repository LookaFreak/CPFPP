const LocalUploader = require("./LocalUploader")



let Platform = process.env?.UPLOADER_PLATFORM || "local"
const UploadFile = (...props) => {
    if (Platform == "aws_s3") {
        return "S3 Uploader"
        // return s3Uploader.uploadFile(...props)
    } else {
        return LocalUploader.UploadFile(...props)
    }
}

module.exports = { UploadFile }
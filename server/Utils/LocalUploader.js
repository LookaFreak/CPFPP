const fs = require("fs");
const path = require("path");





const UploadFile = (file, prevName) => {
    let filePath = path.join(__dirname, "../public");
    let fileName = file.originalname
    let ext = file.originalname.split(".").pop();
    if (prevName) {
        fileName = prevName;
    }
    let pathWithFileName = path.join(__dirname, `../public/${fileName}`);

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    };

    fs.writeFileSync(pathWithFileName, file.buffer);
    let res = { url: fileName, storage: "local" }
    return res;
}

module.exports = { UploadFile };
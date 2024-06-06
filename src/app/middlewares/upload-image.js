const fs = require('fs');
const multer = require('multer');
const path = require("node:path");

const createUploadMiddleware = (folderName) => {
    const dir = path.join(__dirname, '../../public', 'img', folderName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../../public', 'img', folderName));
        },
        filename: function (req, file, cb) {
            const originalFilePath = path.join(__dirname, '../../public', 'img', folderName, file.originalname);
            if (fs.existsSync(originalFilePath)) {
                // If file already exists, use the existing file name
                cb(null, file.originalname);
            } else {
                // If file does not exist, create a new file name
                const newFileName = Date.now() + '-' + file.originalname;
                cb(null, newFileName);
            }
        }
    });
    return multer({storage: storage});
};

module.exports = createUploadMiddleware;

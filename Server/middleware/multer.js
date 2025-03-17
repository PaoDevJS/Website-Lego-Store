import multer from "multer"
import path from "path"

const multerDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },

    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadFile = multer({ storage: multerDiskStorage })

export default uploadFile;
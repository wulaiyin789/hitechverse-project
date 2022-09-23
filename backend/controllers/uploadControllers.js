import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${crypto.createHash('shake256', {
                outputLength: 10
            }).digest('hex')}-${Date.now()}${path.extname(file.originalname)}`
        );
    }
});

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb('Images Only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

export { upload };

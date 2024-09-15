const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();

        cb(null, `${timestamp}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1000 * 1000,
    },
});

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 3 * 1000 * 1000,
//     },
// });

module.exports = upload;

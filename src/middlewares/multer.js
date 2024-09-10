const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1000 * 1000,
    },
});

module.exports = upload;

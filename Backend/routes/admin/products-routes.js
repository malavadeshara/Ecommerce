const express = require('express');

const { handleImageUpload } = require('../../controllers/admin/products-controller');

const {upload} = require('../../config/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

module.exports = router;
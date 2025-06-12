const { imageUploadUtil } = require("../../config/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url); // Assuming this uploads and returns a URL or metadata

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error occurred during image upload',
    });
  }
};

module.exports = { handleImageUpload };

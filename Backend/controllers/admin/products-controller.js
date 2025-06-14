const { imageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product");

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


// add a new product
const addProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    const newlyCreatedProduct = new Product({
      image, title, description, category, brand, price, salePrice, totalStock
    });

    await newlyCreatedProduct.save();

    return res.status(201).json({
      success: true,
      message: "Prodeuct added successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
}

// fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    // console.log("fetching all products...");
    const listOfProducts = await Product.find({});
    // console.log(listOfProducts);
    res.status(200).json({
      success: true,
      data: listOfProducts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
}

// edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;

    let findProduct = await Product.findById(id);

    // console.log(findProduct);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand || findProduct.brand
    findProduct.price = price === '' ? 0 : price || findProduct.price
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock

    await findProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product edited successfully!"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
}

// delet a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    });
  }
}

module.exports = { handleImageUpload, addProduct, deleteProduct, editProduct, fetchAllProducts };

const User = require("../models/User");
const Transaction = require("../models/Transaction")
const Contact = require("../models/Contact");
const Product = require("../models/Product");

exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          purchasesItemsCount: { $size: "$purchasesItems" },
          country: "$address.country",
        },
      },
    ]);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { id } = req.params;

    // Case 1: Fetch all transactions
    if (id === "all") {
      const transactions = await Transaction.find().populate({
        path: "products.productId", // Path to the field to populate
        select: "-description", // Exclude the `description` field
      });

      return res.status(200).json({ success: true, data: { transactions } });
    }

    // Case 2: Check if id is a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let user;

    if (emailRegex.test(id)) {
      user = await User.findOne({ email: id });
    } else {
      // Case 3: Assume id is a user ID
      user = await User.findById(id);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Fetch transactions for the user
    const transactions = await Transaction.find({ email: user.email }).populate(
      {
        path: "products.productId", // Path to the field to populate
        select: "-description", // Exclude the `description` field
      }
    );

    res.status(200).json({ success: true, data: { user, transactions } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getContacts = async (req,res) =>{
  try {
   const contacts = await Contact.find({})
    res.status(200).json({ success: true, data: contacts }); 
  } catch (error) { 
    res.status(500).json({ success: false, error: error.message });
  }
}

exports.getProducts = async (req,res) =>{
  try {
    const { id} = req.params;
    if(id === "all"){
      const products = await Product.find({})
      res.status(200).json({ success: true, data: products }); 
    }
    else{
      const product = await Product.findById(id)
      if(!product){
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      res.status(200).json({ success: true, data: product });
    }
  } catch (error) { 
    res.status(500).json({ success: false, error: error.message });
  } 
}

exports.createProduct = async (req, res) => {
  try {
    const { file, body } = req;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, error: "Image file is required" });
    }

    body.imgsrc = `/uploads/productThumbnail/${file.filename}`;
    const product = await Product.create(body);

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { file, body } = req;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Update the image if a new file is uploaded
    if (file) {
      body.imgsrc = `/uploads/productThumbnail/${file.filename}`;
    }

    Object.assign(product, body);
    await product.save();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
       .status(404)
       .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
    } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    
    }
}
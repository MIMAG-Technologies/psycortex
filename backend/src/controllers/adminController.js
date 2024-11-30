const User = require("../models/User");
const Transaction = require("../models/Transaction")
const Contact = require("../models/Contact");

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

exports.getTransactions = async (req, res) =>{

  try {
    const { id} = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    
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
}

exports.getContacts = async (req,res) =>{
  try {
   const contacts = await Contact.find({})
    res.status(200).json({ success: true, data: contacts }); 
  } catch (error) { 
    res.status(500).json({ success: false, error: error.message });
  }
}
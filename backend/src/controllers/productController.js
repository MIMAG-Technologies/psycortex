const Product = require("../models/Product");


function transformData(input) {
  const groupedData = {};

  // Group by name
  input.forEach((item) => {
    const {
      name,
      imgsrc,
      description,
      Factor,
      diffrentby,
      sessions,
      cost,
      _id,
    } = item;

    if (!groupedData[name]) {
      groupedData[name] = {
        name,
        imgsrc,
        description,
        Factor,
        variants: [],
      };
    }

    // Add each variant with Factor included
    groupedData[name].variants.push({
      productId: _id,
      diffrentby,
      sessions: sessions.toString(),
      cost: cost.toLocaleString(),
    });
  });

  // Convert grouped data to an array
  return Object.values(groupedData);
}

exports.getProduct = async (req, res) => {
  try {
    if (req.params.name === "all") {
      const products = await Product.find();
      const groupedData = transformData(products);
      return res.status(200).json({ success: true, data: groupedData });
    }

    const product = await Product.find({ name: req.params.name });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const groupedData = transformData(product);

    res.status(200).json({ success: true, data: groupedData[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



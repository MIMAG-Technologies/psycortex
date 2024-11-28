const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgsrc: String,
  diffrentby: String,
  sessions: Number,
  Factor: String,
  cost: Number,
  description: String,
});

module.exports = mongoose.model("Product", ProductSchema);

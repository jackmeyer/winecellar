const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wine = new Schema({
  winery: {
    type: String
  },
  wine_name: {
    type: String
  },
  vintage: {
    type: Number
  },
  region: {
    type: String
  },
  country: {
    type: String
  },
  vivino_rating: {
    type: Number
  },
  user_rating: {
    type: Number
  },
  comments: {
    type: String
  },
  date_added: {
    type: Date
  },
  price: {
    type: String
  },
  alcohol_content: {
    type: String
  },
  grapes: {
    type: [String]
  },
  wine_style: {
    type: [String]
  },
  inventory_count: {
    type: Number
  },
},
{timestamps: true});

module.exports = mongoose.model("wine", wine);

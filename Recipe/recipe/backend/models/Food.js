const mongoose = require("mongoose");
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true, // The name of the ingredient (e.g., "onion")
  },
  quantity: {
    type: String,   // The quantity of the ingredient (e.g., "2kg")
    required: true,
  }
});

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true
  },
  ingredients: {
    type: [ingredientSchema],  // An array of ingredients with name and quantity
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("food", foodSchema);

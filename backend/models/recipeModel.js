// Assuming your model is defined like this in Items.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  // Your schema definition here
  name: String,
  price:Number,
  ingredient:[String]
  // other fields...
});

const ItemsModel = mongoose.model('Item', itemSchema, 'menuItems'); // Specify collection name as 'menuItems'

module.exports = {ItemsModel};

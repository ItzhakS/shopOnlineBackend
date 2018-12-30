const mongoose = require('mongoose');

let Category = mongoose.model('category', {
  id:{type:Number},
  name:{type:String}
});

module.exports = Category;
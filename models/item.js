const mongoose = require('mongoose');

let Item = mongoose.model('item', {
  id:{type:Number},
  name:{type:String},
  catId:{type:Number},
  price:{type:Number},
  picturePath:{type:String}
});

module.exports = Item;
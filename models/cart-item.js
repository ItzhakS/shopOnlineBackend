const mongoose = require('mongoose');

let CartItem = mongoose.model('cartItem', {
  id:{type:Number},
  price:{type:Number},
  name:{type:String},
  itemId:{type:Number},
  cartId:{type:Number},
  amount:{type:Number},
  total:{type:Number}
})

module.exports = CartItem;
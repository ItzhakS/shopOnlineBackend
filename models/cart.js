const mongoose = require('mongoose');

let Cart = mongoose.model('cart', {
  id:{type:Number},
  userId:{type:Number},
  dateCreated:{type:Date}
})


module.exports = Cart;
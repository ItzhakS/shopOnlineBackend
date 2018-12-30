const mongoose = require('mongoose');

let Order = mongoose.model('order', {
  id:{type:Number},
  cartId:{type:Number},
  total:{type:Number},
  city:{type:String},
  street:{type:String},
  orderDate:{type:Date},
  sendDate:{type:Date},
  cardNum:{type:Number}
})

module.exports= Order;
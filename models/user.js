const mongoose = require('mongoose');

let User = mongoose.model('user', {
  tz:{type:Number},
  firstName: {type: String},
  lastName: {type: String},
  email:{type:String},
  password:{type:String},
  city:{type:String},
  street:{type:String},
  role:{type:Number}
})


module.exports = User;
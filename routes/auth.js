const authRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Order = require('../models/order');
const Item = require('../models/item');




// New User
authRouter.post('/newUser', (req,res)=>{
  User.findOne({tz:req.body.tz}, (err,copy)=>{
    if(!copy){
      let clonedUser = req.body;
      clonedUser['role'] = 1;
      const user = new User(clonedUser);
      user.save()
      .then(userS=> {
        const payload = {subject: userS._id};
        const token = jwt.sign(payload, 'bananas');
        res.send({token:token,user:userS})
      })
      .catch(e=>res.send(400,e))
    }
    else {
      res.status(401).send('TZ already Exists');
    }
  })
  
});

authRouter.post('/login', (req,res)=>{
  let authUser = req.body;
  User.findOne({email:{$regex: `^${authUser.email}`, $options: "i"}}, (err, resp)=>{
    if(!resp)res.send(404,'User not found')
  })
    .then(userS=>{
      if(userS.password !== authUser.password) res.status(404).send('Invalid Password')
      else{
        const payload = {subject: userS._id};
        const token = jwt.sign(payload, 'bananas');
        res.send({token:token,user:userS})
      }
    })
    .catch(e=>res.send(e.message))
})

authRouter.get('/items', (req,res)=>{
  Item.find()
    .then(docs=>res.send(docs))
    .catch(e=>res.send(e))
});

authRouter.get('/orders', (req,res)=>{
  Order.find()
    .then(docs=>res.send(docs))
    .catch(e=>res.send(e))
});

module.exports = authRouter;
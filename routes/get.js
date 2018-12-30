const getRouter = require('express').Router();
const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Category = require('../models/category');
const Order = require('../models/order');

getRouter.get('/item/:catId', (req,res)=>{
  Item.find({catId: {$eq: req.params.catId}})
    .then(docs=>res.send(docs))
    .catch()
});

getRouter.get('/user/:id', (req,res)=>{
  User.find({tz: {$eq: req.params.id}})
    .then(user=>res.send(user))
    .catch(e=>res.status(400).send(e))
});

getRouter.get('/cart/:cartId', (req,res)=>{
  CartItem.find({cartId: {$eq: req.params.cartId}})
    .then(docs=>res.send(docs))
    .catch(e=>res.send(e))
});

getRouter.get('/search/:str', (req,res)=>{
  const queryString = req.params.str;
  Item.find({ name: { $regex: `^${queryString}`, $options: "i" } })
    .then(docs=>res.send(docs))
    .catch(e=>res.send(e))
})

getRouter .get('/newCart/:userId', (req,res)=>{
  Cart.find()
    .then(
      docs=>{
        cartId = docs.length + 1;
        const cartModel = {
        id: cartId,
        userId: req.params.userId,
        dateCreated: new Date
      }
      const cart = new Cart(cartModel);
      cart.save()
        .then(r=>res.send(r))
        .catch(e=>res.send(e))
      }
    )
})

module.exports = getRouter;
const postRouter = require('express').Router();
const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const Category = require('../models/category');
const Order = require('../models/order');

// New Item
postRouter.post('/item', (req,res)=>{
  const item = new Item(req.body);
  Item.find()
    .then(docs=>{
      item.id = docs.length + 1;
      item.save()
      .then(doc=>{ 
        res.send(doc);
      })
      .catch(e=>res.send(e))
    })
});

// Update Item
postRouter.post('/updateItem/:id', (req,res)=>{
  console.log(req.body);
  let id = parseInt(req.params.id)
  Item.updateOne({id: id},{
    name: req.body.name,
    price: req.body.price,
    picturePath: req.body.picture,
    catId: req.body.category
  })
  .then(doc=>{ 
    res.send(doc);
  })
  .catch(e=>res.send(e))
});


// New Cart Item
postRouter.post('/addCartItem', (req,res)=>{
  let cartItemId;
  CartItem.find({}).sort({_id:-1}).limit(1)
    .then(
      cartI=>{
        console.log(cartI)
        cartItemId = cartI[0].id +1;
        let clonedCartItem = req.body;
        clonedCartItem['id']= cartItemId;
        const cartItem = new CartItem(clonedCartItem)
        cartItem.save()
          .then(docs=>res.send(docs))
          .catch(e=>res.send(400,e))
        })
});

postRouter.delete('/deleteCartItem/:id', (req,res)=>{
  CartItem.findOneAndDelete({id: req.params.id})
    .then(doc=>res.send(doc))
    .catch(e=>res.send(e))
})

postRouter.delete('/removeCartItems/:cartId', (req,res)=>{
  CartItem.deleteMany({cartId:req.params.cartId})
    .then(rez=>res.send(rez))
    .catch(e=>res.send(e))
})

postRouter.post('/shipOrder', (req,res)=>{
  let orderId;
  Order.find()
    .then(
      docs=>{
        orderId = docs.length+1;
        let clonedOrder = req.body;
        clonedOrder['id'] = orderId;
        const newOrder = new Order(req.body);
        newOrder.save()
          .then(doc=>res.send(doc))
          .catch(e=>res.send(e))
      }
    )
})


module.exports = postRouter;
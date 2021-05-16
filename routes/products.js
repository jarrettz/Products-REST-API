const express = require('express');
const { update } = require('../models/product');
const product = require('../models/product');
const router = express.Router();
const Product = require('../models/product');

// Getting all
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Getting one
router.get('/:id', getProduct, (req, res) => {
  res.send(res.product)
});

// Creating one
router.post('/', async (req, res) => {
  const product = new Product({
    imgsrc: req.body.imgsrc,
    title: req.body.title,
    price: req.body.price,
    type: req.body.type,
    description: req.body.description,
  })
  
  try {
    const newProduct = await product.save()
    res.status(201).json(newProduct)
  } catch(err) {
    res.status(400).json({ message: err.message })
  }
});

// Updating one
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.imgsrc != null) {
    res.product.imgsrc = req.body.imgsrc
  }
  if (req.body.title != null) {
    res.product.title = req.body.title
  }
  if (req.body.price != null) {
    res.product.price = req.body.price
  }
  if (req.body.type != null) {
    res.product.type = req.body.type
  }
  if (req.body.description != null) {
    res.product.description = req.body.description
  }
  try {
    const updatedProduct = await res.product.save()
    res.json(updatedProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

// Deleting one
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove()
    res.json({ message: 'Deleted product '})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Middleware
async function getProduct(req, res, next) {
  let product
  try {
    product = await Product.findById(req.params.id)
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.product = product
  next()
};

module.exports = router;
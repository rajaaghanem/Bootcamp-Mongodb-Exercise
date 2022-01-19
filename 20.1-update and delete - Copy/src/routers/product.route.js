const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.post("/products", async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get products that are active
router.get("/products/active", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get products with a specific price range
router.get("/products/range", async (req, res) => {
  try {
    const products = await Product.find({
      $and: [
        { "details.Price": { $lt: req.query.max } },
        { "details.Price": { $gt: req.query.min } },
      ],
    });
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get a specific product by id
router.get("/products/:id", handleResponse);

async function handleResponse(req, res) {
  const _id = req.params.id;
  try {
    const product = await Product.findById(_id);
    if (!product) return res.status(404).send();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

//update a product to become active/not active and change the value of its discount.
router.patch("/products/active/:id", async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["isActive", "details.discount"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const editedProduct = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!editedProduct) return res.status(404).send();
    res.status(200).send(editedProduct);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Delete a specific product
router.delete("/products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) return res.status(404).send();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


module.exports = router;
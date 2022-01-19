const express = require("express");
require("./db/mongoose");
const Product = require("./models/product");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Create a product
app.post("/products", async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get products that are active
app.get("/products/active", async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get products with a specific price range
app.get("/products/range", async (req, res) => {
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
app.get("/products/:id", handleResponse);

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
app.patch("/products/active/:id", async (req, res) => {
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
app.delete("/products/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) return res.status(404).send();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});

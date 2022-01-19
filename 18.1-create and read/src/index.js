const express = require("express");
require("./db/mongoose");
const Product = require("./models/product");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//Create a product
app.post("/products", (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.status(200).send(product);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//Get all products
app.get("/products", (req, res) => {
  Product.find({})
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});


//Get a specific product by id
app.get("/products/:id", handleResponse);

function handleResponse(req, res) {

    const _id = req.params.id;

    Product.findById(_id)
        .then((product) => {
            if (!product) return res.status(404).send();
            res.status(200).send(product);
        })
        .catch((e) => {
            res.status(400).send(e.message);
        });
}



app.listen(port, () => {
  console.log("Server is up on port" + port);
});

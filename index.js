const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// db_name = sells
// db_pass = euzu56pcJHRDuq94

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a8e9r20.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const usedProductsBrand = client
      .db("usedProductsSell")
      .collection("brands");
    const productDetails = client
      .db("usedProductsSell")
      .collection("productsDetails");

    app.get("/brands", async (req, res) => {
      const brandsProducts = await usedProductsBrand.find({}).toArray();
      res.send(brandsProducts);
    });

    app.get("/brands/:id", async (req, res) => {
      const id = req.params.id;
      const query = { brandId: ObjectId(id) };
      const result = await productDetails.find(query).toArray();
      res.send(result);
      console.log(result);
    });

    app.get("/productsDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await productDetails.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Resale Web Server is Running...");
});

app.listen(port, () => {
  console.log(`Resale Web Server Running on: ${port}`);
});

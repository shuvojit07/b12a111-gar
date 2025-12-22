const express = require("express");
const connectDB = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("orders").insertOne(req.body);
  res.send(result);
});

router.get("/my/:email", async (req, res) => {
  const db = await connectDB();
  const orders = await db
    .collection("orders")
    .find({ email: req.params.email })
    .toArray();
  res.send(orders);
});

exports = router;

require("dotenv").config();
const express = require("express");
const Razorpay = require('razorpay')

const app = express();

app.use(express.static('./public'))
app.use(express.json());

app.set("view engine", "ejs");

// app.get('/', (req, res) => {
//     res.render('index')
// })

app.post("/order", async (req, res) => {
  // these routes are designed to deduct the money
  const amount = req.body.amount;
  let instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  let options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  };

  const myOrder = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    amount,
    order: myOrder,
  });
});

module.exports = app;
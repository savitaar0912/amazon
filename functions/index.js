// server.js

const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const stripe = require("stripe")( "sk_test_51ODPWcSBh8ydk88lQEMIAdWNUYB8eJ5C4xsWYCO8BYQRVwUnrMhUnU1geXk9aUcIr8nbs7Z1TfjaBEZRFyjih78d00PbLe2dxi");

// App configuration
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello There");
});

app.post("/payments/create", async (req, res) => {
  const total = req.body.total;
  console.log("Payment Req Received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "Rs",
  });

  res.status(200).json({clientSecret: paymentIntent.client_secret});
});

// Listen will give an app link to get line 19
exports.api = functions.https.onRequest(app);

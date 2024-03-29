// server.js
const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51ODPWcSBh8ydk88lQEMIAdWNUYB8eJ5C4xsWYCO8BYQRVwUnrMhUnU1geXk9aUcIr8nbs7Z1TfjaBEZRFyjih78d00PbLe2dxi");

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// App configuration
const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello There");
});

app.post("/payments/create", async (req, res) => {
  try {
    const total = req.query.total;
    console.log("Payment Req Received", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "INR",
    });

    res.status(201).send({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({error: "Internal Server Error"});
  }
});


// Export will give an app link to get line 19
exports.api = functions.https.onRequest(app);

// example endpoint
// http://127.0.0.1:5001/aclone-2c628/us-central1/api

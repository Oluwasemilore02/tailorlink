require("dotenv").config();
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const admin = require("firebase-admin");

const app = express();
app.use(bodyParser.json());

// Load Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Paystack secret key
process.env.PAYSTACK_SECRET_KEY;

// Paystack webhook endpoint
app.post("/webhook", async (req, res) => {
  const event = req.body;

  // Basic Paystack signature verification
  const crypto = require("crypto");
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Invalid signature");
  }

  // Handle successful charge
  if (event.event === "charge.success") {
    const email = event.data.customer.email;
    const password = "TempPass123!"; // Can generate or send magic link

    try {
      // Create Firebase account
      await admin.auth().createUser({
        email: email,
        password: password,
        displayName: email.split("@")[0],
      });
      console.log("Firebase account created for:", email);
    } catch (err) {
      console.error("Firebase error:", err);
    }
  }

  res.sendStatus(200);
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));

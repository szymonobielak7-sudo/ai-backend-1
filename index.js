import express from "express";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// 🔥 ODPOWIEDŹ NA KAŻDE WEJŚCIE
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Backend działa ✅");
});

// 🔥 fallback – jeśli Render/Android pyta inaczej
app.get("*", (req, res) => {
  res.status(200).send("Backend działa ✅");
});

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send("Webhook error");
    }

    if (event.type === "checkout.session.completed") {
      console.log("Płatność zakończona ✅");
    }

    res.json({ received: true });
  }
);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Backend działa na porcie", PORT);
});

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* ===== TEST ROOT ===== */
app.get("/", (req, res) => {
  res.send("Backend działa ✅");
});

/* ===== ENDPOINT TESTOWY ===== */
app.post("/motywacja", (req, res) => {
  res.json({
    text: "To jest test z backendu 🚀 Backend działa poprawnie."
  });
});

/* ===== START SERWERA ===== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Backend działa na porcie", PORT);
});

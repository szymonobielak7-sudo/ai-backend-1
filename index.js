import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend działa ✅");
});

app.post("/motywacja", (req, res) => {
  const teksty = [
    "Działaj teraz – odkładanie to wróg sukcesu.",
    "Każdy dzień to nowa szansa. Wykorzystaj ją.",
    "Nie musisz być idealny. Wystarczy, że będziesz konsekwentny.",
    "Twoje cele są bliżej, niż myślisz."
  ];

  const losowy = teksty[Math.floor(Math.random() * teksty.length)];
  res.json({ text: losowy });
});

app.listen(PORT, () => {
  console.log("Backend działa na porcie " + PORT);
});

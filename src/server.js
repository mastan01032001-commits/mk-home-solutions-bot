require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MK Home Solutions Bot Running");
});

app.get("/webhook", (req, res) => {
  const verifyToken = process.env.VERIFY_TOKEN;

  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === verifyToken
  ) {
    return res.status(200).send(req.query["hub.challenge"]);
  }

  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log("Incoming WhatsApp message:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MK Home Solutions Bot running on port ${PORT}`);
});

import express from "express";
const app = express();

console.log("Node works");

app.get("/", (req, res) => {
  res.status(200).json({ success: "true" });

  console.log("route hit");
});

app.listen(3000, () => {
  console.log("Listening");
});

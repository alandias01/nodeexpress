import express from "express";
const app = express();

console.log("Node works");

app.get("/api", (req, res) => {
  res.status(200).json({ success: "true" });

  console.log("route hit");
});

if (process.env.NODE_ENV === "production") {
  app.listen();
} else {
  app.listen(3000, () => {
    console.log("Listening");
  });
}

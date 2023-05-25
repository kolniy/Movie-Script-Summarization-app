import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import textSummaryRoute from "./routes/summary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json({ extended: false }));
app.use(express.text());

app.get("/", (req, res) => {
  res.render("index", {
    name: "Some username...",
  });
});

app.use("/api/v1/summary", textSummaryRoute);

const root = path.join(__dirname, "./client", "build");

// block of code come's after application routes
if (process.env.NODE_ENV === "production") {
  // set static files
  // app.use(express.static("client/build"));

  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  // });
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

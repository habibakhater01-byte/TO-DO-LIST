import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { checkConnection, createTable } from "./DB/db.js";
import { todoRoute } from "./Routes/todo.routes.js";
import { toggleRoute } from "./Routes/toggle.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});

app.use(express.json());

// serve the frontend (files inside the public folder)
app.use(express.static(path.join(__dirname, "public")));

app.use("/todo", todoRoute);
app.use("/todo", toggleRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

checkConnection()
  .then(createTable)
  .catch((err) => console.error("Table creation failed:", err.message));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
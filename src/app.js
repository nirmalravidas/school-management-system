import "dotenv/config";
import express from "express";
import schoolRoutes from "./routes/schoolRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', schoolRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
});

export default app;

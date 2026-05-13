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

app.all('/', (req, res) => {
  return res.status(405).json({
    success: false,
    message: 'Method not allowed. Use GET /',
  });
});

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;

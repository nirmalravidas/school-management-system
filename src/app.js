import "dotenv/config";
import express from "express";
import schoolRoutes from "./routes/schoolRoutes.js";
import {testConnection} from "./config/db.js";
import {initDB} from "./config/initDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', schoolRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
});

const startDB = async () => {
    const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
    const missing = requiredEnv.filter((key) => !process.env[key]);

    if (missing.length) {
        throw new Error(`Missing required env vars: ${missing.join(", ")}`);
    }

    await testConnection();
    await initDB();
};

startDB().catch((err) => {
    console.error("Failed to start the database:", err);
    process.exit(1);
});

export default app;

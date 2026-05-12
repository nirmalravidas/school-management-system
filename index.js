import "dotenv/config";
import express from "express";
import schoolRoutes from "./src/routes/schoolRoutes.js";
import {testConnection} from "./src/config/db.js";
import {initDB} from "./src/config/initDB.js";

const app = express();
const PORT = process.env.PORT || 3000;

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

const startServer = async () => {
    try{
        await startDB();
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (err){
        console.error("Error starting the server:", err);
        process.exit(1);
    }
};

startServer();
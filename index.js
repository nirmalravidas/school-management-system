import "dotenv/config";
import app from "./src/app.js";
import { testConnection } from "./src/config/db.js";
import { initDB } from "./src/config/initDB.js";

const PORT = process.env.PORT || 3000;

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
    try {
        await startDB();
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (err) {
        console.error("Error starting the server:", err);
        process.exit(1);
    }
};

startServer();
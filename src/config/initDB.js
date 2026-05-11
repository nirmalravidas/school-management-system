import pool from "./db.js";

export const initDB = async () => {
    try {
        const createTableQueries = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(500) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        console.log("Schools table ready");

        await pool.execute(createTableQueries);
        console.log("schools table initialized successfully");

    } catch (err) {
        console.error("Table initialization failed:", err.message);
    }
}
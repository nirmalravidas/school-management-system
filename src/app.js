import "dotenv/config";
import express from "express";
import {testConnection} from "./config/db.js";
import {initDB} from "./config/initDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API");
});

const startDB = async () => {
    await testConnection();
    await initDB();
};
startDB();

export default app;

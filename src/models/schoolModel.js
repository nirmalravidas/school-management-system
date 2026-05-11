import pool from '../config/db.js';

export const createSchool = async ({ name, address, latitude, longitude }) => {
    const [result] = await pool.execute(
        "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
        [name, address, latitude, longitude]
    );
    return result;
};

export const getAllSchools = async () => {
    const [rows] = await pool.execute(
        "SELECT id, name, address, latitude, longitude FROM schools"
    );
    return rows;
};
import pool from '../config/db.js';
import { DB_TABLES, DB_FIELDS } from '../constants/database.js';
import { AppError } from '../utils/AppError.js';

const { SCHOOLS } = DB_TABLES;
const { ID, NAME, ADDRESS, LATITUDE, LONGITUDE } = DB_FIELDS.SCHOOLS;

export class SchoolRepository {

    static async createSchool(schoolData) {
        try {
            const { name, address, latitude, longitude } = schoolData;
            
            const query = `
                INSERT INTO ${SCHOOLS} 
                (${NAME}, ${ADDRESS}, ${LATITUDE}, ${LONGITUDE}) 
                VALUES (?, ?, ?, ?)
            `;
            
            const [result] = await pool.execute(query, [name, address, latitude, longitude]);
            
            if (!result.insertId) {
                throw new AppError(
                    'Failed to create school - No insert ID returned',
                    500
                );
            }
            
            return result.insertId;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                'Database error while creating school',
                503
            );
        }
    }

    static async findSchoolByNameAndAddress(name, address) {
        try {
            const query = `
                SELECT ${ID}, ${NAME}, ${ADDRESS}, ${LATITUDE}, ${LONGITUDE}
                FROM ${SCHOOLS}
                WHERE ${NAME} = ? AND ${ADDRESS} = ?
                LIMIT 1
            `;
            
            const [rows] = await pool.execute(query, [name, address]);
            
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {

            if (error instanceof AppError) {
                throw error;
            }
            
            throw new AppError(
                'Database error while searching for school',
                503
            );
        }
    }

    static async getAllSchools() {
        try {
            const query = `
                SELECT ${ID}, ${NAME}, ${ADDRESS}, ${LATITUDE}, ${LONGITUDE}
                FROM ${SCHOOLS}
            `;
            
            const [rows] = await pool.execute(query);
            
            return rows;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            
            throw new AppError(
                'Database error while retrieving schools',
                503
            );
        }
    }
}

export default SchoolRepository;

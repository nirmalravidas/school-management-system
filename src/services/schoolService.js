import SchoolRepository from '../repositories/schoolRepository.js';
import { AppError } from '../utils/AppError.js';

export class SchoolService {

    static async createSchool(schoolData) {
        const { name, address, latitude, longitude } = schoolData;

        try {
            const existingSchool = await SchoolRepository.findSchoolByNameAndAddress(name, address);
            
            if (existingSchool) {
                throw new AppError(
                    `School with name "${name}" and address "${address}" already exists`,
                    409
                );
            }

            const insertId = await SchoolRepository.createSchool(schoolData);

            if (!insertId || insertId <= 0) {
                throw new AppError(
                    'Failed to create school - Invalid insert ID returned from database',
                    500
                );
            }

            return {
                id: insertId,
                name,
                address,
                latitude,
                longitude
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            console.error('SchoolService.createSchool error:', error);
            throw new AppError(
                'An unexpected error occurred while creating the school',
                500
            );
        }
    }

    static async getAllSchools() {
        try {
            const schools = await SchoolRepository.getAllSchools();
            return schools;
        } catch (error) {
            
            if (error instanceof AppError) {
                throw error;
            }

            console.error('SchoolService.getAllSchools error:', error);
            throw new AppError(
                'An unexpected error occurred while retrieving schools',
                500
            );
        }
    }
}

export default SchoolService;

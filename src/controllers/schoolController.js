import SchoolService from "../services/schoolService.js";
import { calculateDistance } from "../utils/calculateDistance.js";
import { AppError } from "../utils/AppError.js";

export const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        const school = await SchoolService.createSchool({
            name,
            address,
            latitude,
            longitude
        });

        return res.status(201).json({
            success: true,
            message: "School added successfully",
            data: school,
        });
    } catch (error) {

        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        console.error('addSchool error:', error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while adding the school",
        });
    }
};

export const listSchools = async (req, res) => {
    try {
        const userLatitude = req.query.latitude;
        const userLongitude = req.query.longitude;

        const schools = await SchoolService.getAllSchools();

        const sorted = schools.map((school) => ({
            ...school,
            distance: parseFloat(
                calculateDistance(
                    userLatitude,
                    userLongitude,
                    school.latitude,
                    school.longitude
                ).toFixed(2)
            ),
        })).sort((a, b) => a.distance - b.distance);

        return res.status(200).json({
            success: true,
            count: sorted.length,
            user_location: {
                latitude: userLatitude,
                longitude: userLongitude,
            },
            message: "Schools retrieved successfully",
            data: sorted,
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }

        console.error('listSchools error:', error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while retrieving schools",
        });
    }
}
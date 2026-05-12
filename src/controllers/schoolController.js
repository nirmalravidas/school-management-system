import {createSchool, getAllSchools} from "../models/schoolModel.js";
import {calculateDistance} from "../utils/calculateDistance.js"

export const addSchool = async (req, res) => {
    try {
        const {name, address, latitude, longitude} = req.body;
        
        const id = await createSchool({name, address, latitude, longitude});

        return res.status(201).json({
            success: true,
            message: "School added successfully",
            data: {id, name, address, latitude, longitude},
        });
    } catch(error){
        console.log('addSchool error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while adding the school",
        });
    }
};

export const listSchools = async (req, res) => {
    try {
        const userLatitude = req.query.latitude;
        const userLongitude = req.query.longitude;

        const schools = await getAllSchools();

        const sorted = schools.map((school) => ({
            ...school,
            distance: parseFloat(calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude).toFixed(2)),
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

    } catch(error){
        console.log('listSchools error:', error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving schools",
        });
    }
}
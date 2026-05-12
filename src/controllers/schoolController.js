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
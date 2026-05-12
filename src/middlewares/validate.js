function validateAddSchool(req, res, next){
    const { name, address, latitude, longitude } = req.body;

    if(!name || typeof name !== 'string' || name.trim() === ""){
        return res.status(400).json({
            success: false,
            message: "name is required and must be a non-empty string"
        });
    }

    if(!address || typeof address !== 'string' || address.trim() === ""){
        return res.status(400).json({
            success: false,
            message: "address is required and must be a non-empty string"
        });
    }

    if(latitude === undefined || latitude === null || isNaN(Number(latitude))){
        return res.status(400).json({
            success: false,
            message: "latitude is required and must be a valid number"
        });
    }

    if(longitude === undefined || longitude === null || isNaN(Number(longitude))){
        return res.status(400).json({
            success: false,
            message: "longitude is required and must be a valid number"
        });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if(lat < -90 || lat > 90){
        return res.status(400).json({
            success: false,
            message: "latitude must be between -90 and 90"
        });
    }

    if(lon < -180 || lon > 180){
        return res.status(400).json({
            success: false,
            message: "longitude must be between -180 and 180"
        });
    }

    req.body.name = name.trim();
    req.body.address = address.trim();
    req.body.latitude = lat;
    req.body.longitude = lon;

    next();
}

function validateListSchools(req, res, next){
    const {latitude, longitude} = req.query;

    if(latitude === undefined || latitude === null || isNaN(Number(latitude))){
        return res.status(400).json({
            success: false,
            message: "latitude is required and must be a valid number"
        });
    }

    if(longitude === undefined || longitude === null || isNaN(Number(longitude))){
        return res.status(400).json({
            success: false,
            message: "longitude is required and must be a valid number"
        });
    }

    const lat = Number(latitude);
    const lon = Number(longitude);

    if(lat < -90 || lat > 90){
        return res.status(400).json({
            success: false,
            message: "latitude must be between -90 and 90"
        });
    }

    if(lon < -180 || lon > 180){
        return res.status(400).json({
            success: false,
            message: "longitude must be between -180 and 180"
        });
    }

    req.query.latitude = lat;
    req.query.longitude = lon;

    next();
}

module.exports = {validateAddSchool, validateListSchools};

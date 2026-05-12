const parseCoordinate = (value) => {
    if (value === undefined || value === null || String(value).trim() === "") {
        return NaN;
    }
    return Number(value);
};

export function validateAddSchool(req, res, next){
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

    const lat = parseCoordinate(latitude);
    const lon = parseCoordinate(longitude);

    if (isNaN(lat)){
        return res.status(400).json({
            success: false,
            message: "latitude is required and must be a valid number"
        });
    }

    if (isNaN(lon)){
        return res.status(400).json({
            success: false,
            message: "longitude is required and must be a valid number"
        });
    }

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

export function validateListSchools(req, res, next){
    const {latitude, longitude} = req.query;

    const lat = parseCoordinate(latitude);
    const lon = parseCoordinate(longitude);

    if (isNaN(lat)){
        return res.status(400).json({
            success: false,
            message: "latitude is required and must be a valid number"
        });
    }

    if (isNaN(lon)){
        return res.status(400).json({
            success: false,
            message: "longitude is required and must be a valid number"
        });
    }

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
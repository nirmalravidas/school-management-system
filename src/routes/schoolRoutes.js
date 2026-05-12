import { Router} from "express";
import { validateAddSchool, validateListSchools } from "../middlewares/validate.js";
import { addSchool, listSchools } from "../controllers/schoolController.js";

const router = Router();

router.post('/addSchool', validateAddSchool, addSchool);
router.get('/listSchools', validateListSchools, listSchools);

export default router;
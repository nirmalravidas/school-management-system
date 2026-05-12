import { Router} from "express";
import { validateAddSchool } from "../middlewares/validate.js";
import { addSchool } from "../controllers/schoolController.js";

const router = Router();

router.post('/addSchool', validateAddSchool, addSchool);

export default router;
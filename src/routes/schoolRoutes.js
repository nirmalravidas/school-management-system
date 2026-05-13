import { Router} from "express";
import { validateAddSchool, validateListSchools } from "../middlewares/validate.js";
import { addSchool, listSchools } from "../controllers/schoolController.js";

const router = Router();

router.post('/addSchool', validateAddSchool, addSchool);
router.get('/listSchools', validateListSchools, listSchools);

router.all('/addSchool', (req, res) => {
  return res.status(405).json({
    success: false,
    message: 'Method not allowed. Use POST /addSchool',
  });
});

router.all('/listSchools', (req, res) => {
  return res.status(405).json({
    success: false,
    message: 'Method not allowed. Use GET /listSchools',
  });
});

export default router;
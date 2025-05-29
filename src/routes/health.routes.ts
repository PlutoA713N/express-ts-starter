import {Router} from 'express';
import {mongoHealthcheck} from "../models/mongo_operations";

const router = Router();

router.get("/mongodb", mongoHealthcheck)

export default router;

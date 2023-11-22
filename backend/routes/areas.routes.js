import { Router} from 'express';
import { getAreas, postAreas } from '../controllers/areas.js';

const router = Router();

router.get('/', getAreas);
router.post('/', postAreas);

export default router;

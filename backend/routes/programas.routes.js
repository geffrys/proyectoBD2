import {Router} from 'express';
import {getProgramas, postProgramas} from '../controllers/programas.js';

const router = Router();

router.get('/', getProgramas);
router.post('/', postProgramas);

export default router;

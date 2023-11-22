import {Router} from 'express';
import {getSedes, postSedes} from '../controllers/sedes.js';

const router = Router();

router.get('/', getSedes);
router.post('/', postSedes);

export default router;

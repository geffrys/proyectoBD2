import {Router} from 'express';
import {getFacultades, postFacultades, getFacultadById} from '../controllers/facultades.js';

const router = Router();

router.get('/', getFacultades);
router.post('/', postFacultades);
router.get('/:id', getFacultadById);

export default router;

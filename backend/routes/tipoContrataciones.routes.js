import { Router } from 'express';

import { getTiposContrataciones, postTiposContrataciones } from '../controllers/tiposContrataciones.js';

const router = Router();

router.get('/', getTiposContrataciones);
router.post('/', postTiposContrataciones);

export default router;

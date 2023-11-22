import {Router} from 'express';
import paisRouter from './paises.routes.js';

const router = Router();

router.use('/paises', paisRouter);

export default router;
import {Router} from 'express';
import paisRouter from './paises.routes.js';
import departamentoRouter from './departamentos.routes.js';
import ciudadRouter from './ciudades.routes.js';
import facultadRouter from './facultades.routes.js';
import tipoEmpleadoRouter from './tipoEmpleado.routes.js';
import tipoContratacionRouter from './tipoContrataciones.routes.js';
import empleadoRouter from './empleados.routes.js';
import areaRouter from './areas.routes.js';
import programaRouter from './programas.routes.js';
import sedesRouter from './sedes.routes.js';
import eventosRouter from './eventos.routes.js';

const router = Router();

router.use('/paises', paisRouter);
router.use('/departamentos', departamentoRouter);
router.use('/ciudades', ciudadRouter);
router.use('/facultades', facultadRouter);
router.use('/tiposEmpleados', tipoEmpleadoRouter);
router.use('/tiposContrataciones', tipoContratacionRouter);
router.use('/empleados', empleadoRouter);
router.use('/areas', areaRouter);
router.use('/programas', programaRouter);
router.use('/sedes', sedesRouter);
router.use('/eventos', eventosRouter);



export default router;
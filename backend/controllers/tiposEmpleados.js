import postgresPool from '../database/postgres_pool.js';


export const getTiposEmpleados = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM tipos_empleado');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const postTiposEmpleados = async (req,res) => {
    try {
        const {nombre} = req.body;
        const response = await postgresPool.query('INSERT INTO tipos_empleado (nombre) VALUES ($1)',[nombre]);
        res.status(200).json({message: 'Tipo de empleado creado correctamente', body: {tipoEmpleado: {nombre}}});
    } catch (error) {
        res.status(500).json({message: error});
    }
}
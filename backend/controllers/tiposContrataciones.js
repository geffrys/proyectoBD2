import postgresPool from '../database/postgres_pool.js';


export const getTiposContrataciones = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM tipos_contratacion');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postTiposContrataciones = async (req,res) => {
    try {
        const {nombre} = req.body;
        const response = await postgresPool.query('INSERT INTO tipos_contratacion (nombre) VALUES ($1)',[nombre]);
        res.status(200).json({message: 'Tipo de contratación creado correctamente', body: {tipoContratacion: {nombre}}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}
import postgresPool from '../database/postgres_pool.js';

export const getAreas = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM areas');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postAreas = async (req,res) => {
    try {
        const {codigo,nombre, facultades_codigo} = req.body;
        const response = await postgresPool.query('INSERT INTO areas (codigo,nombre,facultades_codigo) VALUES ($1,$2,$3)',[codigo,nombre,facultades_codigo]);
        res.status(200).json({message: 'Area creada correctamente', body: {area: {nombre}}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}
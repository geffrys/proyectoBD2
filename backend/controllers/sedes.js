import postgresPool from '../database/postgres_pool.js';

export const getSedes = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM sedes');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postSedes = async (req,res) => {
    try {
        const {codigo,nombre, codigo_ciudad} = req.body;
        const response = await postgresPool.query('INSERT INTO sedes (codigo,nombre,codigo_ciudad) VALUES ($1,$2,$3)',[codigo,nombre,codigo_ciudad]);
        res.status(200).json({message: 'Sede creada correctamente', body: {sede: {nombre}}});
    } catch (error) {
        res.status(500).json({message: error})
    }
}


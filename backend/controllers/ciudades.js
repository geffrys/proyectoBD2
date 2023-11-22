import postgresPool from '../database/postgres_pool.js';

export const getCiudades = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM ciudades');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postCiudades = async (req,res) => {
    try {
        const {codigo,nombre, codigo_departamento} = req.body;
        const response = await postgresPool.query('INSERT INTO ciudades (codigo,nombre,codigo_departamento) VALUES ($1,$2,$3)',[codigo,nombre,codigo_departamento]);
        res.status(200).json({message: 'Ciudad creada correctamente', body: {ciudad: {nombre}}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

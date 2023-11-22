import postgresPool from '../database/postgres_pool.js';

export const getFacultades = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM facultades');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postFacultades = async (req,res) => {
    try {
        const {codigo,nombre, ubicacion, nro_telefono} = req.body;
        const response = await postgresPool.query('INSERT INTO facultades (codigo,nombre,ubicacion,nro_telefono) VALUES ($1,$2,$3, $4)',[codigo,nombre,ubicacion,nro_telefono]);
        res.status(200).json({message: 'Facultad creada correctamente', body: {facultad: {nombre}}});
    } catch (error) {
        res.status(500).json({message: error})
    }
}

export const getFacultadById = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM facultades WHERE codigo = $1',[req.params.id]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({message: error})
    }
}
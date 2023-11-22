import postgresPool from '../database/postgres_pool.js';

export const getProgramas = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM programas');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postProgramas = async (req,res) => {
    try {
        const {codigo,nombre, areas_codigo} = req.body;
        const response = await postgresPool.query('INSERT INTO programas (codigo,nombre,areas_codigo) VALUES ($1,$2,$3)',[codigo,nombre,areas_codigo]);
        res.status(200).json({message: 'Programa creado correctamente', body: {programa: {nombre}}});
    } catch (error) {
        res.status(500).json({message: error});
    }
}
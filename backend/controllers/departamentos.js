import postgresPool from '../database/postgres_pool.js';

export const getDepartamentos = async (req,res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM departamentos');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export const postDepartamentos = async (req,res) => {
    try {
        const {codigo,nombre, codigo_pais} = req.body;
        const response = await postgresPool.query('INSERT INTO departamentos (codigo,nombre,codigo_pais) VALUES ($1,$2,$3)',[codigo,nombre,codigo_pais]);
        res.status(200).json({message: 'Departamento creado correctamente', body: {departamento: {nombre}}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}
import postgresPool from '../database/postgres_pool.js';

export const getPaises = async (req, res) => {
    try {
        const response = await postgresPool.query(`SELECT codigo, nombre
        FROM public.paises;`);
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e });
    }
}

export const postPaises = async (req, res) => {
    try {
        const { codigo, nombre } = req.body;
        console.log(codigo, nombre);
        const response = await postgresPool.query(`INSERT INTO public.paises(
            codigo, nombre)
            VALUES ($1, $2);`,
            [
                Number(codigo),
                nombre
            ]);
        res.status(200).json({
            message: 'Pais agregado correctamente',
            body: {
                response
            }
        })
    } catch (e) {
        res.status(500).json({ "message": e });
    }
}
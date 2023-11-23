import postgresPool from '../database/postgres_pool.js';

export const getEmpleados = async (req, res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM empleados');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const postEmpleados = async (req, res) => {
    try {
        const { identificacion, nombres, apellidos, email, tipo_contratacion, tipo_empleado, cod_facultad, cod_sede, lugar_nacimiento } = req.body;
        const response = await postgresPool.query('INSERT INTO empleados (identificacion,nombres,apellidos,email,tipo_contratacion, tipos_empleado, cod_facultad, codigo_sede, lugar_nacimiento) VALUES ($1,$2,$3,$4,$5, $6, $7, $8, $9)', [identificacion, nombres, apellidos, email, tipo_contratacion,tipo_empleado, cod_facultad, cod_sede, lugar_nacimiento]);
        res.status(200).json({ message: 'Empleado creado correctamente', body: { empleado: { response } } });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getEmpleadoById = async (req, res) => {
    try {
        const response = await postgresPool.query('SELECT * FROM empleados WHERE identificacion = $1', [req.params.id]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
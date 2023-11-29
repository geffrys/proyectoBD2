import Evento from '../models/eventos.js'
import postgresPool from '../database/postgres_pool.js';

export const getEventos = async (req, res) => {
    try {
        const eventos = await Evento.find();

        for (let [i, evento] of eventos.entries()) {
            for (const [index, asistente] of evento.asistentes.entries()) {
                if (asistente.relacioninstitucion == 'PROFESOR' || asistente.relacioninstitucion == 'ADMINISTRATIVO') {
                    try {
                        const response = await postgresPool.query(`SELECT empleados.identificacion, empleados.nombres || ' ' || empleados.apellidos as nombres, 
                        empleados.email, empleados.tipos_empleado as relacioninstitucion, ciudades.nombre as ciudad, sedes.nombre as sede,
                        departamentos.nombre as departamento, paises.nombre as pais
                        FROM empleados 
                        INNER JOIN sedes ON sedes.codigo = empleados.codigo_sede
                        INNER JOIN ciudades ON ciudades.codigo = empleados.lugar_nacimiento
                        INNER JOIN departamentos ON ciudades.codigo_departamento = departamentos.codigo
                        INNER JOIN paises ON departamentos.codigo_pais = paises.codigo
                        WHERE identificacion like '${asistente.identificacion}';`
                        );
                        console.log(response.rows[0]);
                        if (response.rows.length > 0) {
                            let event = {
                                identificacion: response.rows[0].identificacion,
                                nombreUsuario: evento.asistentes[index].nombreUsuario,
                                nombre: response.rows[0].nombres,
                                relacioninstitucion: response.rows[0].relacioninstitucion,
                                email: response.rows[0].email,
                                sede: response.rows[0].sede,
                                ciudad: {
                                    nombre: response.rows[0].ciudad,
                                    departamento: {
                                        nombre: response.rows[0].departamento,
                                        pais: response.rows[0].pais
                                    }
                                },

                            }
                            eventos[i].asistentes[index] = event;
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }

        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await Evento.findById(id);

        for (const [index, asistente] of evento.asistentes.entries()) {
            if (asistente.relacioninstitucion == 'PROFESOR' || asistente.relacioninstitucion == 'ADMINISTRATIVO') {
                try {
                    const response = await postgresPool.query(`SELECT * FROM empleados 
                        WHERE identificacion like '${asistente.identificacion}' `
                    );
                    console.log(response.rows[0]);
                    if (response.rows.length > 0) {
                        evento.asistentes[index] = { info_evento: evento.asistentes[index], info_empleado: response.rows[0] };
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// forma 1 verificando desde la base de datos que los objetos existan

export const createEvento = async (req, res) => {
    const evento = req.body;
    const newEvento = new Evento(evento);

    // validaciones
    try {
        let ciudad = await postgresPool.query(`SELECT * FROM ciudades WHERE nombre like '${evento.lugar.ciudad.nombre}'`);
        if (ciudad.rows.length == 0) {
            return res.status(500).json({ message: 'la ciudad ingresada no existe en el sistema' });
        }

        for (const facultad of evento.facultadesOrganizadoras) {
            let facultadBD = await postgresPool.query(`SELECT * FROM facultades WHERE nombre like '${facultad.nombre}'`);
            if (facultadBD.rows.length == 0) {
                return res.status(500).json({ message: `la facultad ingresada no existe en el sistema ${facultad.nombre}` });
            }
        }

        for (const asistente of evento.asistentes) {
            let ciudad = await postgresPool.query(`SELECT * FROM ciudades WHERE nombre like '${asistente.ciudad.nombre}'`);
            if (ciudad.rows.length == 0) {
                return res.status(500).json({ message: 'la ciudad ingresada en asistente no existe en el sistema' });
            }
        }

        let programa = await postgresPool.query(`SELECT * FROM programas WHERE nombre like '${evento.programaOrganizador}'`);
        if (programa.rows.length == 0) {
            return res.status(500).json({ message: 'el programa ingresado no existe en el sistema' });
        }

        await newEvento.save();
        return res.status(200).json(newEvento);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}




export const updateEvento = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categorias, fecha, lugar, asistentes, facultadesOrganizadoras, programaOrganizador, comentarios } = req.body;

    try {
        let ciudad = await postgresPool.query(`SELECT * FROM ciudades WHERE nombre like '${evento.lugar.ciudad.nombre}'`);
        if (ciudad.rows.length == 0) {
            throw new Error('la ciudad ingresada no existe en el sistema');
        }
        facultadesOrganizadoras.forEach(async (facultad) => {
            let facultadBD = await postgresPool.query(`SELECT * FROM facultades WHERE nombre like '${facultad.nombre}'`);
            if (facultadBD.rows.length == 0) {
                throw new Error(`la facultad ingresada no existe en el sistema ${facultad.nombre}`);
            }
        })
        let programa = await postgresPool.query(`SELECT * FROM programas WHERE nombre like '${evento.programaOrganizador}'`);
        if (programa.rows.length == 0) {
            throw new Error('el programa ingresado no existe en el sistema');
        }

        const updatedEvent = await Evento.findByIdAndUpdate(id, { titulo, descripcion, categorias, fecha, lugar, asistentes, facultadesOrganizadoras, programaOrganizador, comentarios }, { new: true });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteEvento = async (req, res) => {
    const { id } = req.params;
    try {
        await Evento.findByIdAndDelete(id);
        res.status(200).json({ message: "Evento eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
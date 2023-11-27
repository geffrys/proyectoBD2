import mongoose_pool from '../database/mongoose_pool.js';
import mongoose from 'mongoose';

const departamentoSchema = new mongoose.Schema({
    nombre: String,
    pais: String,
});

const ciudadSchema = new mongoose.Schema({
    nombre: String,
    departamento: departamentoSchema
}); 

const participanteSchema = new mongoose.Schema({
    identificacion: String,
    nombreUsuario: String,
    nombre: String,
    relacioninstitucion: String,
    email: String,
    ciudad: ciudadSchema,
    rol: String, // asistente, facilitador, conferencista
});


const comentarioSchema = new mongoose.Schema({
    comentario: String,
    usuario: String,
});

const lugarSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    ciudad: ciudadSchema
});

const facultadSchema = new mongoose.Schema({
    nombre: String
});

const eventoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    categorias: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    lugar: {
        type: lugarSchema,
        required: true,
    },
    asistentes: {
        type: [participanteSchema],
        default: []
    },
    facultadesOrganizadoras: {
        type: [facultadSchema],
        default: [],
    },
    programaOrganizador: {
        type: String,
        required: true,
    },
    comentarios: {
        type: [comentarioSchema],
        default: [],
    }
});

const Evento = mongoose_pool.model('Evento', eventoSchema);

export default Evento;
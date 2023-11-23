import mongoose_pool from '../database/mongoose_pool.js';
import mongoose from 'mongoose';

const participanteSchema = new mongoose.Schema({
    nombre: String,
    rol: String, // asistente, facilitador, conferencista
});

const comentarioSchema = new mongoose.Schema({
    comentario: String
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
        type: String,
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
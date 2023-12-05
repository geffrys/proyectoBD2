import mongoose_pool from '../database/mongoose_pool.js';
import mongoose from 'mongoose';

const departamentoSchema = new mongoose.Schema({
    nombre: String,
    pais: String,
}, {strict: false, _id: false});

const ciudadSchema = new mongoose.Schema({
    nombre: String,
    departamento: departamentoSchema
}, {strict: false, _id: false}); 

const participanteSchema = new mongoose.Schema({
    identificacion: String,
    nombreUsuario: String,
    nombre: String,
    relacioninstitucion: String,
    email: String,
    ciudad: ciudadSchema,
    rol: String, // asistente, facilitador, conferencista
}, {strict: false, _id: false});


const comentarioSchema = new mongoose.Schema({
    comentario: String,
    usuario: String,
}, {strict: false, _id: false});

const lugarSchema = new mongoose.Schema({
    nombre: String,
    direccion: String,
    ciudad: ciudadSchema
}, {strict: false, _id: false});

const facultadSchema = new mongoose.Schema({
    nombre: String
}, {strict: false, _id: false});

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
        type: [String],
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
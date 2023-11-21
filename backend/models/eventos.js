import mongoose from "mongoose";

const participanteSchema = new mongoose.Schema({
    nombre: String,
    rol: String, // asistente, facilitador, conferencista
});


const enventoSchema = new mongoose.Schema({
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
        required: true,
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
        type: [String],
        default: [],
    },
    programaOrganizador: {
        type: String,
        required: true,
    },
    comentarios: {
        type: [String],
        default: [],
    }
});

const Evento = mongoose.model('Evento', enventoSchema);

export default Evento;
import mongoose from "mongoose";

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
        type: string,
        required: true,
    }
});

const Evento = mongoose.model('Evento', enventoSchema);

export default Evento;
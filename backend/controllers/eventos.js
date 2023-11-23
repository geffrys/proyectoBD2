import Evento from '../models/eventos.js'

export const getEventos = async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.status(200).json(eventos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const evento = await Evento.findById(id);
        res.status(200).json(evento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createEvento = async (req, res) => {
    const evento = req.body;
    const newEvento = new Evento(evento);
    try {
        await newEvento.save();
        res.status(200).json(newEvento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateEvento = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, categorias, fecha, lugar, asistentes, facultadesOrganizadoras, programaOrganizador, comentarios } = req.body;
    try {
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
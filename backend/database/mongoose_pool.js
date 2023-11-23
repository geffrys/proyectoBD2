import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI;

const mongooseConnection = mongoose.createConnection(mongoURI);

mongooseConnection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
});

mongooseConnection.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

mongooseConnection.on('disconnected', () => {
    console.log('Desconectado de MongoDB. Intentando reconectar...');
});

mongooseConnection.on('reconnected', () => {
    console.log('Reconexión exitosa a MongoDB');
});

export default mongooseConnection;
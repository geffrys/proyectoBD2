import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGO_URI;

const mongooseConnection = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongooseConnection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
});

mongooseConnection.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

export default mongooseConnection;
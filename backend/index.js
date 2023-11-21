import express from 'express';
import cors from 'cors';
import mainRouter from './routes/main.routes.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/v1', mainRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
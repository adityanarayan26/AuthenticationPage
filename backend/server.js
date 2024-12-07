import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './connection/db.js';
import router from './routes/route.js';
import cors from 'cors';
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)
app.listen(port, () => {
    ConnectDB()
    console.log(`Server is running on port ${port}`)
})
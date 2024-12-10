import express from 'express';
import dotenv from 'dotenv';
import { ConnectDB } from './connection/db.js';
import router from './routes/route.js';
import cors from 'cors';
dotenv.config();


const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin: "https://authentication-page-9v8io8t2n-adityanarayan26s-projects.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router)
app.listen(port, () => {
    ConnectDB()
    console.log(`Server is running on port ${port}`)
})
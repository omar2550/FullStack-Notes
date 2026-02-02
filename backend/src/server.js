import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './config/db.js';
import router from './routes/NotesRoutes.js';
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL,
}))
app.use(express.json())
app.use(rateLimit)

app.use("/api/notes", router)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server is working')
    })
})
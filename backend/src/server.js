import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

import { connectDB } from './config/db.js';

import rateLimit from './middleware/rateLimiter.js';
import notesRoutes from './routes/notes.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    }))
}
app.use(express.json())
app.use(cookieParser())
app.use(rateLimit)

app.use("/api/notes", notesRoutes)
app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })

}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server is working')
    })
})
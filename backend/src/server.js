import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import { connectDB } from './config/db.js';
import router from './routes/NotesRoutes.js';
import rateLimit from './middleware/rateLimiter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: process.env.FRONTEND_URL,
    }))
}
app.use(express.json())
app.use(rateLimit)

app.use("/api/notes", router)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })

}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server is working')
    })
})
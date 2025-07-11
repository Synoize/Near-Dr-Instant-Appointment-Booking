import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';

import adminRouter from './routes/admin-route.js';
import doctorRouter from './routes/doctor-route.js';
import userRouter from './routes/user-route.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000
const corsOptions = {
    origin: [
        "http://localhost:5174",
        "http://localhost:5173",
        "https://neardr.onrender.com",
        "https://neardr-admin.onrender.com",
        "https://neardr.vercel.app",
        "https://neardr-admin.vercel.app",
    ],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

// middlewares
app.use(express.json())
app.use(cors(corsOptions))

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res) => {
    res.send('API IS WORKING...')
})

const start = async () => {
    try {
        await connectDB();
        await connectCloudinary();
        app.listen(PORT, () => {
            console.log(`server is listen on PORT : ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();

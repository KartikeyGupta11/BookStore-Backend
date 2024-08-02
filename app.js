import express from 'express';
import 'dotenv/config';
import dbConnect from './dbConnect.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.get("/",(req,res) => {
    res.send("<h1>Welcome to Book Store</h1>")
});

app.use("/api/v1/books",bookRoutes);

const start = async () =>{
    try {
        await dbConnect(process.env.MONGODB_URL);
        console.log("Database Connected Successfully...");
        app.listen(PORT,() =>{
            console.log(`Server is running at PORT: ${PORT}`);
        })
    } catch (error) {
        console.log("Error in dbConnect",error);
    }
}

start();
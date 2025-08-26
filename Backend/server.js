import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());
// allows us to accept JSON data in req.body

app.use("/api/products", productRoutes);
const port = process.env.PORT || 5000;
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Started on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
        process.exit(1);
    });
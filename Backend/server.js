import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in req.body
const __dirname = path.resolve();

//  CRITICAL: API routes MUST come first!
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
    // Serve static files from dist folder
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));

    // Catch-all handler: send back React's index.html file for any non-API routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}

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
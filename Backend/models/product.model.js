import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // fields with their types
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    // createdAt, UpdatedAt
    timestamps: true
});
// Linking products(Collection) and it's Schema
// to the model Product
const Product = mongoose.model("Product", productSchema);

export default Product;

import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const prod = await Product.find({});
        res.status(200).json({ success: true, data: prod });
    } catch (error) {
        console.error("Error fetching the products ", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const postProducts = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product: " + error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const prod = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }
    try {
        // making new true return the updated product
        const updateProduct = await Product.findByIdAndUpdate(id, prod, { new: true });
        if (!updateProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updateProduct });
    } catch (error) {
        console.error("Server Error ", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteProducts = async (req, res) => {
    // to get the dynamic url part - id
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found" });
    }

};;

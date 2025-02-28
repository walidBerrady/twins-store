import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        description: {
            type: String
        },
        category: {
            type: String,
            enum: ["Homme", "Femme"],
            required: true,
        },
        sizes: {
            "5ml": {
                price: Number,
                stock: Number
            },
            "10ml": {
                price: Number,
                stock: Number
            },
            "Full": {
                price: Number,
                stock: Number
            },
        },
        image: {
            type: String,
            required: true
        },
        isFeatured: { 
            type: Boolean, 
            default: false 
        },
    },
    {timestamps: true}
);

export default mongoose.model("Product", productSchema);

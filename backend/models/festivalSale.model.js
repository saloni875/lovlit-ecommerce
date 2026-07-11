import mongoose from "mongoose";

const festivalSaleSchema = new mongoose.Schema(
    {
        festivalName: {
            type: String,
            required: true,
            unique: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
            max: 60
        },
        applyToAll: {
            type: Boolean,
            default: false,
        },
        categories: {
            type: [String],
            default: [],
        },
        active: {
            type: Boolean,
            default: true,
        },

    },
    { timestamps: true }
);

const FestivalSale = mongoose.model("FestivalSale", festivalSaleSchema);

export default FestivalSale;
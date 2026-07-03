import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },

        caption: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            required: true,
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
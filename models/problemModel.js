import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
    {
        statement: {
            type: String,
            required: true,
            trim: true,
        },

        options: {
            type: [String]
        },

        answer: {
            type: String,
            required: true,
        },

    },

);

export default mongoose.model("problem", problemSchema);

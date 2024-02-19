import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Ensure that image is defined as a string type
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

export const Category = mongoose.model("Category", categorySchema);

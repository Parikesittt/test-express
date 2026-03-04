import { Schema } from "mongoose";

export const ProductSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
    stock: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

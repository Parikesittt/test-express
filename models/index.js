import mongoose from "mongoose";
import { PostSchema } from "./schemas/board.js";
import { UserSchema } from "./schemas/user.js";
import { ProductSchema } from "./schemas/product.js";

export const Post = mongoose.model("Post", PostSchema);
export const User = mongoose.model("User", UserSchema);
export const Product = mongoose.model("Product", ProductSchema);
import { Schema } from "mongoose";

export const PostSchema = new Schema({
    title: String,
    content: String,

}, {
    timestamps: true,
});
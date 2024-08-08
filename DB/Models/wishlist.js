import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const wishListSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.models.Wishlist || model('Wishlist',wishListSchema);

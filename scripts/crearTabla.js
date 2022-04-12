import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  id: { type: Number, min: 0, required: true, unique: true },
  title: { type: String },
  price: { type: Number, min: 0 },
  thumbnail: { type: String },
});

export default productsSchema;

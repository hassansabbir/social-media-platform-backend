import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  bio: { type: String, default: '' },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

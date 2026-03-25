import { User } from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (data: any) => {
  const { name, username, email, password } = data;
  
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error('User with email or username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({ name, username, email, passwordHash });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

  return { token, user: { id: user._id, name, username, email } };
};

const loginUser = async (data: any) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
  return { token, user: { id: user._id, name: user.name, username: user.username, email: user.email } };
};

const getMe = async (id: string) => {
  const user = await User.findById(id).select('-passwordHash');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateProfile = async (id: string, data: any) => {
  const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).select('-passwordHash');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const UserService = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
};

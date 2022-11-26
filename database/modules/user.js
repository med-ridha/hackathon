import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, },
  surname: { type: String, required: true, trim: true, },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, },
  password: { type: String, required: true, trim: true, minlength: 7, },
  cin: { type: String, required: true, trim: true, minlength: 8, maxlength: 8, unique: true, },
  region: { type: String, required: true, trim: true, },
  phone: { type: String, required: true, trim: true, minlength: 8, maxlength: 8, },

}, {versionKey : false});

export default mongoose.model('User', userSchema);

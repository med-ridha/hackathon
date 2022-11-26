import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true, trim: true, },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true, },
  password: { type: String, required: true, trim: true, minlength: 7, },
  cin: { type: String, required: true, trim: true, minlength: 8, maxlength: 8, unique: true, },
  phone: { type: String, required: true, trim: true, minlength: 8, maxlength: 8, },
  type: { type: String, required: true, trim: true, },
  file : { type: String, trim: true, },
  status: { type: String, trim: true, },

}, {versionKey : false});

export default mongoose.model('User', userSchema);

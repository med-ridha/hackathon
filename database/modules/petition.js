import { mongoose } from 'mongoose';

const petitionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, },
  desc: { type: String, required: true, trim: true, },
  signatures: [{ type: objectId}],
  image: { type: String, trim: true, },
  createdBy: { type: objectId},
  ong: [{ type: String, trim: true, }],
  comments: [{ type: objectId}],
  createdAt: { type: Date, default: Date.now },
  endDate: { type: Date, required: true, },
  status: { type: String, required: true, trim: true, },



}, {versionKey : false});

export default mongoose.model('Petition', userSchema);

import mongoose from 'mongoose'

mongoose.Promise = global.Promise;
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database Connected"))
  .catch((error) => console.error(error));

export default mongoose;



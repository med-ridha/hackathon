import 'dotenv/config';
import express from 'express';
import './database/mongoose.js';
import User from './database/DAO/userDao.js';
import cors from 'cors';
import multer from 'multer';
const app = express();
const port = process.env.PORT || 42069;

const storage = multer.diskStorage({
  destination: function(_, __, cb) {
    cb(null, 'uploads/');
  },
  filename: function(_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
})

const upload = multer({ storage: storage })
//const upload = multer({ dest: 'uploads/' })
app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (_, res) => {
  res.send('it works!');
})

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { user, error } = await User.findByCredentials(req.body.email, req.body.password);
  console.log(user);
  console.log(error);
  if (error) {
    res.status(400).send(error.error);
  } else {
    const token = User.generateAuthToken(user);
    res.send({ user, token });
  }
})

app.post("/register", upload.single('file'), async (req, res) => {
  let userdata = undefined;
  let errordata = undefined;
  if (req.body.type === 'Organization') {
    console.log(req.files);
    if (req.file === undefined) {
      res.status(200).json({error: 'file is required'});
      return;
    }
    const { user, error } = await User.registerUser(req.body, req.file.filename);
    userdata = user?.user
    errordata = error?.error
  } else {
    const { user, error } = await User.registerUser(req.body);
    console.log(user);
    userdata = user?.user
    errordata = error?.error
  }
  if (errordata) {
    if (errordata.code === 11000) {
      if (errordata.keyPattern.email) {
        res.status(200).send({ error: 'Email already exists' });
      }
      if (errordata.keyPattern.cin) {
        res.status(200).send({ error: 'CIN already exists' });
      }
    } else {
      res.status(200).send({ error: "something went wrong" });
    }
  } else {
    const token = User.generateAuthToken(userdata);
    res.status(200).send({success:'user created', userdata, token });
  }
});

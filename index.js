import 'dotenv/config';
import express from 'express';
import './database/mongoose.js';
import User from './database/DAO/userDao.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 42069;
app.use(express.json());
app.use(cors());


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (_, res) => {
  res.send('it works!');
})

app.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = User.generateAuthToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
})

app.post("/register", async (req, res) => {
  const { user, error } = await User.registerUser(req.body);
  if (error) {
    if (error.error.code === 11000) {
      if (error.error.keyPattern.email) {
        res.status(400).send({ error: 'Email already exists' });
      }
      if (error.error.keyPattern.cin) {
        res.status(400).send({ error: 'CIN already exists' });
      }
    } else {
      res.status(400).send({ error: error });
    }
  } else {
    const token = User.generateAuthToken(user.user);
    res.status(201).send({ user, token });
  }
});

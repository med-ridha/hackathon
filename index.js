import 'dotenv/config';
import express from 'express';
import './database/mongoose.js';
import User from './database/DAO/userDao.js';
const app = express();
const port = process.env.PORT || 42069;
app.use(express.json());


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (_, res) => {
  res.send('it works!');
})

app.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await User.generateAuthToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
})

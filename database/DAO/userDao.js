import User from '../modules/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userDao = {
  async findByCredentials(email, password) {
    User.findOne({ email }, (err, user) => {
      if (err) {
        throw new Error(err);
      }
      if (!user) {
        throw new Error('Unable to login');
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return user;
        } else {
          throw new Error('Unable to login');
        }
      });
    }, (err, user) => {
      if (err) {
        throw new Error(err);
      }
      return user;
    });
  },
  async generateAuthToken(user) {
    const token = jwt.sign({
      _id: user
        ._id.toString()
    }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  },
  async registerUser(body) {
    const password = body.password;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });
    await user.save();
    return user;
  
  }
}

export default userDao;

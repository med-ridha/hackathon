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
    const token = jwt.sign({ _id: user
      ._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
  }
}

export default userDao;

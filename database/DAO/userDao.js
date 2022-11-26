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
      bcrypt.compare(password, user.password, (_, result) => {
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
  generateAuthToken(user) {
    const token = jwt.sign({
      _id: user._id.toString() + user.name.toString(),
    }, process.env.JWT_SECRET);
    console.log(token);
    return token;
  },
  async registerUser(body) {
    const promise = new Promise(async (res, rej) => {
      try {
        const password = body.password;
        const hashedPassword = await bcrypt.hash(password, 8);
        (new User({
          email: body.email,
          name: body.name,
          password: hashedPassword,
          surname: body.surname,
          cin: body.cin,
          region: body.region,
          phone: body.phone,
        })).save().then(result => {
          res({ user: result });
        }).catch((error) => {
          console.log(error);
          rej({ error });
        });
      } catch (error) {
        throw new Error(error);
      }
    });
    try {
      const user = await promise;
      return {user};
    }catch (error) {
      return {error};
    }
  }
}

export default userDao;

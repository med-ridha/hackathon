import User from '../modules/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userDao = {
  async findByCredentials(email, password) {
    const promise = new Promise(async (res, rej) => {
      const user = await User.findOne({ email });
      if (!user) {
        rej({ error: 'Unable to login' });
      }
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          rej({ error: 'Unable to login' });
        }
        res(user);
      }
    });
    try {
      const user = await promise;
      return { user };
    } catch (error) {
      return { error };
    }
  },
  generateAuthToken(user) {
    console.log(user);
    const token = jwt.sign({
      _id: user._id.toString() + user.fullname.toString(),
    }, process.env.JWT_SECRET);
    console.log(token);
    return token;
  },
  async registerUser(body, file) {
    const promise = new Promise(async (res, rej) => {
      try {
        const password = body.password;
        const hashedPassword = await bcrypt.hash(password, 8);
        (new User({
          email: body.email,
          fullname: body.fullname,
          password: hashedPassword,
          cin: body.cin,
          phone: body.phone,
          status: (body.type === 'ong') ? 'wating' : undefined,
          type: 'user',
          file: file,
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
      return { user };
    } catch (error) {
      return { error };
    }
  }
}

export default userDao;

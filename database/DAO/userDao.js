import User from '../modules/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userDao = {
  async findByCredentials(email, password) {
    const promise = new Promise(async (res, rej) => {
      // Find user by email and password.
      const user = await User.findOne ({ email }); 
      if (!user) {
        rej('Unable to login');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        rej('Unable to login');
      }
      res(user);
    });
    try {
      const user = await promise;
      return { user };
    } catch (error) {
      return { error };
    }
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
      return { user };
    } catch (error) {
      return { error };
    }
  }
}

export default userDao;

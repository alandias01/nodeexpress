import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from './authMW';

const authRoute = Router();

// jwt key should be stored on the server
const signingKey = process.env.SIGNING_KEY || 'secret';
const createToken = (email: string) => jwt.sign({ email }, signingKey, { expiresIn: '2h' });

const userdb: { email: string; password: string }[] = [];
userdb.push({ email: 'alan1', password: 'test' });

authRoute.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send('email & password are required');
    }

    // check if user already exist
    // const oldUser = await User.findOne({ email });
    // if (oldUser) {
    //   return res.status(409).send("User Already Exist. Please Login");
    // }

    const emailSanitized = (email as string).toLowerCase();
    const oldUser = userdb.find(u => u.email === emailSanitized);
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    userdb.push({ email: emailSanitized, password: encryptedPassword });
    const token = createToken(emailSanitized);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

authRoute.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send('email & password are required');
    }

    const emailSanitized = (email as string).toLowerCase();

    // const user = await userdb.findOne({emailSanitized});
    const user = userdb.find(u => u.email === emailSanitized);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(emailSanitized);
      res.status(200).json({ token });
    }
  } catch (error) {
    next(error);
  }
});

authRoute.get('/admin', authenticateJWT, (req, res, next) => {
  const { email } = req.user;
  res.status(200).json(req.user);
});

export default authRoute;

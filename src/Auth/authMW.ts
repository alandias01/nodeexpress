import jwt from 'jsonwebtoken';

const signingKey = process.env.SIGNING_KEY || 'secret';

export const authenticateJWT = (req, res, next) => {
  // const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, signingKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

export const auth2 = () => {};

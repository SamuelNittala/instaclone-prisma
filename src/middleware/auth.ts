import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.send('Not authorized');
    return;
  }
  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.send('Not a valid token');
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    res.status(401);
    res.send('Not a valid token');
    return;
  }
};

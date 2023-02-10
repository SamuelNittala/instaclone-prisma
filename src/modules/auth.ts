import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type UserToken = {
  id: string;
  username: string;
};

export const createToken = (user: UserToken) => {
  const token = jwt.token(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
  return token;
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

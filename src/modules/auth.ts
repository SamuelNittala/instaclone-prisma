import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createToken = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.profile_name},
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

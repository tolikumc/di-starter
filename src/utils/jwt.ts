import * as jwt from 'jsonwebtoken';

export const getToken = (item: string): string => {
  return jwt.sign(item.toString(), process.env.JWT_SECRET);
};

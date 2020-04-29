import bcrypt from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

export async function checkUserPassword(password: string, hashPassword: string): Promise<string> {
  return await bcrypt.compare(password, hashPassword);
}

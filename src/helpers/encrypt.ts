import bcrypt from 'bcrypt';
import User from '../models/auth.models';

/**
 * @param password - The plain text password to encrypt.
 * @returns A Promise that resolves to the hashed password.
 */
export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Verifies a plain text password against its hashed version.
 * @param password - The plain text password to verify.
 * @param hash - The hashed password to compare against.
 * @returns A Promise that resolves to a boolean indicating whether the password matches the hash.
 */
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

export const verifyUser = async (password: string, email: string) => {
  let userInfo = await User.findOne({
    where: { email },
    raw: true,
  });

  if (userInfo) {
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (isMatch) return userInfo;
    return false;
  }
  return false;
};

export const getPassword = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

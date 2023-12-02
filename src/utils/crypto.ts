import crypto from 'crypto';

function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function generateHash(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

export function encryptPassword(password: string) {
  const salt = generateSalt();
  const hash = generateHash(password, salt);
  return { salt, hash };
}

export function isPasswordCorrect(inputPassword: string, storedHash: string, storedSalt: string) {
  const hash = generateHash(inputPassword, storedSalt);
  return hash === storedHash;
}

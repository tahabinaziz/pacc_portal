import { generatePasswordHash, hashPassword } from "../utility/crypt.ts";
import sql from "./db.ts";

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const passwordHash = await hashPassword(password);

  const newUser = await sql`
    INSERT INTO users (name, email, password_hash, created_at)
    VALUES (${name}, ${email}, ${passwordHash}, NOW())
    RETURNING id
  `;

  return newUser[0];
}
export async function getUser(email: string) {
  return await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
  `;
}

export async function resetPassword(email: string, plainText: string) {
  const temPwd = await generatePasswordHash(plainText);
  await sql`
  UPDATE users SET password_hash = ${temPwd.hashPwd}
  WHERE email = ${email}
  RETURNING id
  `;
}

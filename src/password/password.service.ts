import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class PasswordService {
  private readonly hashRounds = +(process.env.HASH_ROUNDS ?? 10);

  async hashPassword(password: string): Promise<string> {
    try {
      const passwordHash = await bcrypt.hash(password, this.hashRounds);

      return passwordHash;
    } catch (error: unknown) {
      console.error('Error hashing password', error);
      throw error;
    }
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw new Error('Failed to compare passwords');
    }
  }
}

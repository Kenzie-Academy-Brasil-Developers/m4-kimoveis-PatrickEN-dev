import { Repository } from "typeorm";
import { TLogin } from "../../@types/login/login.type";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { Tuser } from "../../@types/users.types";
import { AppError } from "../../errors/error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export const createTokenService = async (loginData: TLogin) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: Tuser | null = await userRepository.findOne({
    where: { email: loginData.email },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid: boolean = await compare(loginData.password, user.password);

  const isEmailValid: boolean = loginData.email.toLowerCase() == user.email.toLowerCase();

  if (!isPasswordValid || !isEmailValid) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.deletedAt) {
    throw new AppError("User is deleted", 401);
  }

  const token = sign(
    {
      id: user.id,
      email: user.email,
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "4hr",
      subject: String(user.id),
    }
  );
  return { token };
};

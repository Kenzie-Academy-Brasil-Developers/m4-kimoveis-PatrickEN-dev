import { Repository } from "typeorm";
import { TLogin } from "../../@types/login/login.type";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";

export const createTokenService = async (loginData: TLogin) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: { email: loginData.email },
  });

  if (!user) throw new AppError("Invalid credentials", 401);

  const isPasswordValid: boolean = await compare(loginData.password, user.password);

  if (!isPasswordValid || user.deletedAt) {
    throw new AppError("Invalid credentials", 401);
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

import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TuserRequest, TuserResponse } from "../../@types/users.types";
import { userSchemaResponse } from "../../schemas/users.schema";

export const createUserService = async (userData: TuserRequest): Promise<TuserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser: TuserResponse = userSchemaResponse.parse(user);

  return newUser;
};

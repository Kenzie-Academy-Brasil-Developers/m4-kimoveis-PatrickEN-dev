import { Repository } from "typeorm";
import { TuserResponse } from "../../@types/users.types";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userSchemaResponseArray } from "../../schemas/users.schema";

export const listUsersService = async (): Promise<TuserResponse[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find();

  const allUsers = userSchemaResponseArray.parse(users);

  return allUsers;
};

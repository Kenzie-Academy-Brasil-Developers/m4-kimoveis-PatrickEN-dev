import { Repository } from "typeorm";
import { TuserUpdate } from "../../@types/users.types";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userSchemaResponse } from "../../schemas/users.schema";

export const updateUserService = async (
  userId: number,
  userData: TuserUpdate
): Promise<TuserUpdate> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const userDatas = Object.assign({}, oldUserData, userData);

  const newUserData: User | null = userRepository.create({
    ...userDatas,
  });

  await userRepository.save(newUserData);

  const userUpdated: TuserUpdate = userSchemaResponse.parse(newUserData);

  return userUpdated;
};

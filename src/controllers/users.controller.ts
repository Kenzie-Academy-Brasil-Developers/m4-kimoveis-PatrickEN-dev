import { Request, Response } from "express";
import { TuserRequest, TuserResponse, TuserUpdate } from "../@types/users.types";
import { createUserService } from "../service/users/users.post.service";
import { listUsersService } from "../service/users/users.get.service";
import { updateUserService } from "../service/users/users.patch.service";
import { desactiveUserService } from "../service/users/users.delete.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const userData: TuserRequest = req.body;

  const newUser: TuserResponse = await createUserService(userData);

  return res.status(201).json(newUser);
};

export const listUserController = async (req: Request, res: Response): Promise<Response> => {
  const usersList = await listUsersService();

  return res.status(200).json(usersList);
};

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const userData: TuserUpdate = req.body;

  const userUpdated = await updateUserService(userId, userData);

  return res.status(200).json(userUpdated);
};

export const desactiveUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  await desactiveUserService(userId);

  return res.status(204).send();
};

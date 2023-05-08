import { Request, Response } from "express";
import { TuserRequest, TuserResponse } from "../@types/users.types";
import { createUsersService } from "../service/users/users.post.service";
import { listUsersService } from "../service/users/users.get.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const userData: TuserRequest = req.body;

  const newUser: TuserResponse = await createUsersService(userData);

  return res.status(201).json(newUser);
};

export const listUserController = async (req: Request, res: Response): Promise<Response> => {
  const usersList = await listUsersService();

  return res.status(200).json(usersList);
};

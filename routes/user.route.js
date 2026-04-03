import { Router } from "express";
import { getUsers, getUser, getUsersByName, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const userRouter = Router();

// GET all users
userRouter.get('/', getUsers);

// GET user by id
userRouter.get('/getbyid/:id', getUser);


// GET users by name
userRouter.get('/getbyname/:search_text', getUsersByName);

// POST create user
userRouter.post('/', createUser);

// PUT update user by id
userRouter.put('/:id', updateUser);

// DELETE user by id
userRouter.delete('/:id', deleteUser);

export default userRouter;

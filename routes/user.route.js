import { Router } from "express";
import { getUsers, getUser, getUsersByName, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/authorize.middleware.js";
const userRouter = Router();

// GET all users
userRouter.get('/', authenticateToken, getUsers);

// GET user by id
userRouter.get('/getbyid/:id', getUser);


// GET users by name
userRouter.get('/getbyname', getUsersByName);

// POST create user
userRouter.post('/', createUser);

// PUT update user by id
userRouter.put('/update/:id', updateUser);

// DELETE user by id
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;

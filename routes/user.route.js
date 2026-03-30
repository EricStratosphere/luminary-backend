import { Router } from "express";

const userRouter = Router();

// GET all users
userRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all users!"
    });
});

// GET user by id
userRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched user by id!"
    });
});

// POST create user
userRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new user!"
    });
});

// PUT update user by id
userRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated user!"
    });
});

// DELETE user by id
userRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted user!"
    });
});

export default userRouter;

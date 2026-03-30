import { Router } from "express";

const bookmarkRouter = Router();

// GET all bookmarks
bookmarkRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all bookmarks!"
    });
});

// GET bookmark by id
bookmarkRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched bookmark by id!"
    });
});

// POST create bookmark
bookmarkRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new bookmark!"
    });
});

// PUT update bookmark by id
bookmarkRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated bookmark!"
    });
});

// DELETE bookmark by id
bookmarkRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted bookmark!"
    });
});

export default bookmarkRouter;

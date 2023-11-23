import { Router } from "express";
import database from "../databases/connection.js";
const router = Router();

router.get("/api/v1/posts", async (req, res) => {
    const [data] = await database.execute("SELECT * FROM posts;");
    const posts = data.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        date_time: post.date_time,
        bump_order: post.bump_order,
        image: post.image,
        boards_id: post.boards_id
    }));
    return res.send({ data: posts });
});

router.get("/api/v1/posts/:boards_id", async (req, res) => {
    const boardsId = req.params.boards_id;
    try {
        const [data] = await database.execute("SELECT * FROM posts WHERE boards_id = ?;", [boardsId]);

        if (data.length === 0) {
            return res.status(404).send({ error: `Posts from board with ID ${boardsId} not found` })
        }

        return res.send({ data: data });
    } catch (exception) {
        return res.status(500).send({ error: exception.toString() });
    }
});

router.post("/api/v1/posts", async (req, res) => {
    const {title, content, image, date_time, bump_order, boards_id} = req.body;

    if (!title || !image || !date_time || !bump_order || !boards_id) {
        return res.status(400).send({ message: 'Please provide all required credentials' });
    }

    try {
        const [response] = await database.execute(
            "INSERT INTO posts (title, content, date_time, bump_order, image, boards_id) VALUES (?, ?, ?, ?, ?, ?)", 
            [title, content, date_time, bump_order, image, boards_id]);

        return res.status(201).send({ message: response.toString() });
    } catch (exception) {
        return res.status(500).send({message: exception.toString()});
    }
});

export default router;
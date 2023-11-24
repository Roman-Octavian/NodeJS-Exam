import { Router } from "express";
import database from "../databases/connection.js";
import multer from "multer";

const router = Router();
let upload = multer();
const BOARD_MAX_SIZE = 10;

router.get("/api/v1/posts", async (req, res) => {
    const [data] = await database.execute("SELECT * FROM posts;");
    const posts = data.map((post) => ({
        id: post.id,
        title: post.title,
        text: post.text,
        image_original: post.image_original,
        image_thumbnail: post.image_thumbnail,
        date_time: post.date_time,
        bump_order: post.bump_order,
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

router.get("/api/v1/boards/:board_name/posts/:post_id", async (req, res) => {
    const id = req.params.post_id;
    try {
        const [data] = await database.execute("SELECT * FROM posts WHERE id = ?;", [id]);

        if (data.length === 0) {
            return res.status(404).send({ error: `Post with ID ${id} not found` })
        }

        return res.send({ data: data });
    } catch (exception) {
        return res.status(500).send({ error: exception.toString() });
    }
});

router.post("/api/v1/posts", async (req, res) => {
    const { title, text, image_original, image_thumbnail, date_time, bump_order, boards_id } = req.body;

    if (!title || !image_original || !image_thumbnail || !date_time || !bump_order || !boards_id) {
        return res.status(400).send({ message: 'Please provide all required credentials' });
    }

    try {
        await database.beginTransaction();
            const bumpAll = await database.query(`
                UPDATE posts 
                SET bump_order = bump_order + 1 
                WHERE boards_id = ?
             `, [boards_id]);

            const [response] = await database.query(
                "INSERT INTO posts (title, text, image_original, image_thumbnail, date_time, bump_order, boards_id) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                [title, text, image_original, image_thumbnail, date_time, bump_order, boards_id]);

            const deleteStale = await database.query(`
                DELETE FROM posts
                WHERE bump_order > ? AND boards_id = ?
            `, [BOARD_MAX_SIZE, boards_id]);

            await database.commit();
            return res.status(200).send({ok: true})

    } catch (exception) {
        return res.status(500).send({message: exception.toString()});
    }
});

router.post("/api/v1/upload_image", upload.single("file"), async (req, res) => {

    const formData = new FormData();
    const blobData = new Blob([req.file.buffer]);
    formData.append("file", blobData, req.file.originalname);
    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.CLOUDFLARE_UPLOAD_TOKEN}`,
            },
            body: formData,
        });
        return res.status(200).json({message: response.statusText, data: await response.json()});
    } catch (error) {
        return res.status(500).send({ message: error.toString()});
    }
});

router.delete("/api/v1/mods/posts/:post_id", async (req, res) => {
    const post_id = req.params.post_id;
    try {
        const result = await database.execute("DELETE FROM posts WHERE id = ?;", [post_id]);
        return res.status(200).send(result);
    } catch (exception) {
        return res.status(500).send({ error: exception.toString() });
    }
});

export default router;
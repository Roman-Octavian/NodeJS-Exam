import { Router } from "express";
import database from "../databases/connection.js";

const router = Router();

router.get("/api/v1/boards", async (req, res) => {
    const [data] = await database.execute("SELECT * FROM boards;");
    const boards = data.map((board) => ({
        id: board.id,
        name: board.name
    }));
    return res.send({ data: boards });
});

router.get("/api/v1/boards/:name", async (req, res) => {
    const boardsName = req.params.name;
    try {
        const [data] = await database.execute("SELECT * FROM boards WHERE name = ?;", [boardsName]);

        if (data.length === 0) {
            return res.status(404).send({ error: `Board with name ${boardsName} not found` })
        }

        return res.send({ data: data });
    } catch (exception) {
        return res.status(500).send({ error: exception.toString() });
    }
});

export default router;
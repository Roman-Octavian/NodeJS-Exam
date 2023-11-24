import { Router } from "express";
import database from "../databases/connection.js";

const router = Router();

router.get("/api/v1/replies/:posts_id", async (req, res) => {
  const posts_id = req.params.posts_id;
  try {
    const [data] = await database.query("SELECT * FROM replies WHERE posts_id = ?", [posts_id]);
    const replies = data.map((reply) => ({
        id: reply.id,
        text: reply.text,
        image_original: reply.image_original,
        image_thumbnail: reply.image_thumbnail,
        date_time: reply.date_time,
        posts_id: reply.posts_id
    }));
    return res.status(200).send({ data: replies });
  } catch (error) {
    return res.status(500).send(error);
  }

});

router.post("/api/v1/replies", async (req, res) => {
  const { text, image_original, image_thumbnail, date_time, posts_id } = req.body;
  if (!text ||  !date_time || !posts_id) {
      return res.status(400).send({ message: 'Please provide all required credentials' });
  }
  try {
      const response = await database.query(
        "INSERT INTO replies (text, image_original, image_thumbnail, date_time, posts_id) VALUES (?, ?, ?, ?, ?)", 
        [text, image_original, image_thumbnail, date_time, posts_id]);
      return res.status(200).send(response)
  } catch (exception) {
      return res.status(500).send({message: exception.toString()});
  }
});

export default router;
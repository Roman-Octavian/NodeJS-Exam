import express from "express";
import dotnev from "dotenv";
import session from "express-session";
import cors from "cors";
import multer from "multer";

const app = express();
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());

dotnev.config();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false }
}));

let upload = multer();

import boardsRouter from "./routers/boardsRouter.js";
app.use(boardsRouter);

import postsRouter from './routers/postsRouter.js';
app.use(postsRouter);

import moderatorRouter from "./routers/moderatorRouter.js";
app.use(moderatorRouter);

app.post("/api/v1/upload_image", upload.single("file"), async (req, res) => {

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
        console.log(await response.json());
        return res.status(200).send({ message: response.text });
    } catch (error) {
        return res.status(500).send({ message: error.toString()});
    }
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log("Server is running on port", server.address().port));
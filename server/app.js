import express from "express";
import dotnev from "dotenv";
import session from "express-session";
import cors from "cors";

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


import boardsRouter from "./routers/boardsRouter.js";
app.use(boardsRouter);

import postsRouter from './routers/postsRouter.js';
app.use(postsRouter);

import moderatorRouter from "./routers/moderatorRouter.js";
app.use(moderatorRouter);

import repliesRouter from "./routers/repliesRouter.js";
app.use(repliesRouter);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log("Server is running on port", server.address().port));
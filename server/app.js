import express from "express";
import dotnev from "dotenv";
import session from "express-session";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());

dotnev.config();

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false }
});
app.use(sessionMiddleware);

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

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
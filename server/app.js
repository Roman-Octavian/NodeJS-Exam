import express from "express"
import cors from "cors"

const app = express();
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(express.json());


const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log("Server is running on port", server.address().port));
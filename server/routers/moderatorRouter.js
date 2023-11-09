import { Router } from "express";
import bcrypt from "bcrypt"
import database from "../databases/connection.js";

const router = Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body

      if (!password || !username) {
        return res.status(400).send({ message: 'Please provide all required credentials' });
    }

     const [userFound] = await database.execute('SELECT * FROM users WHERE username = ?', [username]);

     if (userFound.length > 0){
        const userData = userFound[0];

        const isSamePassword = bcrypt.compare(password, userData.password)

        if (isSamePassword) {
            const user = req.session.user = {
                id: userData.id,
                username: userData.username
            };

            return res.status(200).send({ message: user });
     }
     
    }
    return res.status(404).send({ message: "User Not found" });

});

export default router;
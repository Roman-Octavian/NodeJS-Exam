import connection from "./connection.js";
import { clearAll, createBoards, createPosts, createReplies, createModerators, initializeAdmin, initializeBoards } from "./sql.js";
import bcrypt from 'bcrypt';

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

const createTables = async () => {
    try {
        if (isDeleteMode) {
            await connection.query(clearAll);
            console.log("DROPPED ALL TABLES")
        }
        await connection.query(createBoards);
        console.log('CREATED boards');

        await connection.query(createPosts);
        console.log('CREATED posts');

        await connection.query(createReplies);
        console.log('CREATED replies');

        await connection.query(createModerators);
        console.log('CREATED moderators');

        const hashedPassword = await bcrypt.hash("admin", 10);

        await connection.query(initializeAdmin, [hashedPassword]);
        console.log("INITIALIZED admin");

        await connection.query(initializeBoards);
        console.log("INITIALIZED boards");

        connection.end();
    } catch (error) {
        console.error(error);
    }
};

createTables();
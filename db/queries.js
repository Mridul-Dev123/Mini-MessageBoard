import pool from "./pool.js"


async function getAllMessages()
{
    const {rows}=await pool.query("Select * from messages");
    return rows
}

async function addMessage(user, text)
{
    await pool.query("Insert into messages  (username,text) values($1, $2) ",[user, text]);
    return ;
}

const db={getAllMessages, addMessage}
export default db;
#! /usr/bin/env node

import  { Client } from "pg";

const SQL=`
CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR (255),
text VARCHAR (500),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
INSERT INTO messages (username,text)
VALUES
    ('Bryan','HI I AM BRYAN'),
    ('Odin','HI ODIN'),
    ('Damon','HI DAMON');

`;

async function main(){
    console.log("seeding...");
    const client=new Client({
        connectionString:"postgressql://ubuntu_wsl:Mridul@8950@localhost:5432/top_users",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");

}

main();
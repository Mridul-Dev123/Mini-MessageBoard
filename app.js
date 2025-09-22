import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./db/queries.js";
import dotenv from "dotenv";
dotenv.config();



const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath=path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");








app.get("/",(req,res)=>{

    db.getAllMessages()
    .then((messages)=>{res.render('index',{messages});})
    .catch((err)=>{
        res.send(`Some error occured ${err}`)
    })
    
})

app.get("/new",(req,res)=>{
    res.render('addMessage');
})

app.post("/new",(req, res)=>{
    const {text,user}=req.body;

   db.addMessage(user,text)
   .then((kk)=>{res.redirect("/")})
   .catch((err)=>res.send(`Some error occured while storing ${err}`));
    
})

const PORT=3000;


app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("error");
    }

    console.log(`App is running at localhost:${PORT}`);
})
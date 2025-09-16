import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";


const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsPath=path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



const messages=[
    {
        text:"Hi there!",
        user:"Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user:"Charles",
        added: new Date()
    }
];





app.get("/",(req,res)=>{
    res.render('index',{messages});
})

app.get("/new",(req,res)=>{
    res.render('addMessage');
})

app.post("/new",(req, res)=>{
    const {text,user}=req.body;

    messages.push({user,text,added:new Date()});
    res.redirect('/');
    
})

const PORT=3000;


app.listen(PORT,(err)=>{
    if(err)
    {
        console.log("error");
    }

    console.log(`App is running at localhost:${PORT}`);
})
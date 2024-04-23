const express = require('express');
const path =require('path');
require("./db/conn");
const User=require("./models/usermessage");
const hbs=require('hbs');


const app= express();
const port =process.env.port ||3000;

// setting the path
const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialpath=path.join(__dirname,"../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath))
app.set("view engine","hbs");

app.set("views",templatepath);
hbs.registerPartials(partialpath)

app.get("/" ,(req,res)=>{
    res.render("index");
})
// app.get("/" ,(req,res)=>{
//     res.render("index");
// })
app.get("/contactt" ,(req,res)=>{
    res.render("contactt");
})
app.get("/about" ,(req,res)=>{
    res.render("about");
})
app.get("/maps" ,(req,res)=>{
    res.render("maps");
})
app.get("/gallery" ,(req,res)=>{
    res.render("gallery");
})
app.get("/queries" ,(req,res)=>{
    res.render("queries");
})
app.get("/terms" ,(req,res)=>{
    res.render("terms");
})

app.post("/contact", async(req ,res)=>{
    try{
        // res.send(req.body);
        const userData=new User(req.body);
        await userData.save();
        res.status(201).render("index");

    }catch(error){
        res.status(500).send(error);
    }


})

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})
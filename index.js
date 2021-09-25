const express = require("express");
const app = express();
const port = 80;
app.use("/static", express.static("static"));
app.use(express.urlencoded({extended:true}));
//app.set("view engine", "ejs");
//app.set("views", __dirname+"views");

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/TestForm");

const myFormSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    city: String
});

// Defining Model
const myModel = mongoose.model('Form', myFormSchema);

const bodyparser = require("body-parser");

app.get("/", (req, res)=>{
    res.status(200).render(__dirname+'/main.ejs');
});

app.post("/submit", (req, res)=>{

    let myData = new myModel(req.body);

    myData.save().then(()=>{
        res.status(200).sendFile(__dirname+"/aftersubmit.ejs");
    }).catch(()=>{
        res.status(400).send("Sorry! Item was not saved to the databse");
    });

});

app.get("/new", (req,res)=>{
    res.status(200).render(__dirname+'/main.ejs');
});

app.get("/viewdetails", (req,res)=>{
    
    myModel.find({},(err, resultset)=>{
        if(err) console.log(err);
        res.status(200).render(__dirname+"/view.ejs", {resultset: resultset});
    });
});

app.listen(port, ()=>{console.log("!!!Server started successfully!!!");});





/*
// Data Retrieval 
app.post("/farmer/auth", (req,res)=>{
    let resultArray=[];
    console.log("Mago");
    
    myLoginFarmerModel.find({},(err, resultset)=>{
        if(err) console.log(err);
        res.send(resultset[0].loginid);
    });

});
*/
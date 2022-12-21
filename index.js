const express = require("express");
const app = express();
const cors =require("cors");
const db = require("./db");
const dotenv =require("dotenv");
const mongo = require("./db");
const { raw } = require("express");

dotenv.config()
db.connect()
app.use(express.json())
app.use(cors())

app.use("/",(req,res,next) => {
    console.log("Passed Middleware");
    next();
})

app.post("/adopt",async (req,res,next) => {
    try{
        const {name,mail,phone,type,family,choice} = req.body;
        console.log(req.body)

        if(!(name || mail || phone || type|| family)){
            res.status(404).send({messge: "Please Pass all the details"})
        }

        const resp = await mongo.selectedDB.collection("adopt").insertOne({...req.body})
        console.log(resp);
        res.status(201).send(resp);
    }
    catch(err){
        console.log("Error on Creation")
        res.status(404).send({messge: "Something went wrong"})
    }
})

app.get("/get",async (req,res,next) => {
    try{

        const resp = await mongo.selectedDB.collection("adopt").find({}).toArray();
        res.status(200).send(resp);
    }
    catch(err){
        console.log("Error on Getting details")
        res.status(404).send({messge: "Something went wrong"})
    }
})

app.listen(process.env.PORT || 3011, () => {
    console.log("Server Started Successfully")
})
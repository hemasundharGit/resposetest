const express=require('express')
const cors=require('cors')
const {MongoClient}= require('mongodb')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const {expressjwt:exjwt} =require('express-jwt')
const jwt_decode =require('jwt-decode')
const fs =require('fs')

const app=express()
app.use(cors())
app.use(express.json())

var secretkey="abcd"
var algorithm ="HS256"
var jwtmw = exjwt({
    secret:secretkey,
    algorithms:[algorithm]
})

const client=new MongoClient('mongodb+srv://admin:admin@cluster0.yiaipqu.mongodb.net/?retryWrites=true&w=majority');
client.connect()
const db=client.db('MSWD')
const col=db.collection('Register')


app.get('/home',(req,res)=>{
    res.send("welcome")
})
app.post('/insert',async (req,res)=>{
    console.log(req.body)
    req.body.password=await bcrypt.hash(req.body.password,5)
    col.insertOne(req.body)
    res.send("data received")
})
app.get('/show', jwtmw, async(req,res)=>{
    console.log(req.headers)
    console.log(jwt_decode.jwtDecode(req.headers.authorization.substring(7)))
    var result=await col.find().toArray()
    res.send(result)
})
app.post('/check', async(req,res)=>{
    console.log(req.body)
    var result=await col.findOne({name:req.body.un})
    console.log(result)
    if(await bcrypt.compare(req.body.pw,result.password)){
        var token = jwt.sign(result,secretkey,{
            algorithm:algorithm,
            expiresIn:"20m"

        })
        res.send({
            message:result,
            token:token
        })
    }
    else{
        res.send({
            message:"fail",
            token:null

        })
    }
})

app.get('/file',(req,res)=>{
    fs.writeFile("demo.text","welcome",function(err){
        return err
    })
    res.send("return data")
})
app.get('/append',(req,res)=>{
    fs.appendFile("demo.text"," mswd class",function(err){
        return err
    })
    res.send(" data appended")
})
app.get('/read',async(req,res)=>{
    fs.readFile("demo.text","utf-8",function(err,data){
        console.log(data)
        res.send(data)
    })

})

app.delete('/delete',async (req,res)=>{
    console.log(req.query.name)
    await col.deleteOne({name:req.query.name})
    res.send("deleted")
})
app.put('/update',async(req,res)=>{
    console.log(req.body)
    var doc={
        $set:{
            password:await bcrypt.hash(req.body.pw,5),
            email:req.body.email,
            role:req.body.role
        }
    }
    col.updateOne({name:req.body.name},doc)
    res.send("updated successfully")
})

app.post('/appointment/book', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWD');
        const bookappointments = db.collection('bookappointment');
        client.connect()
        const appointmentData = req.body;
        if (!appointmentData.studentId || !appointmentData.studentName || !appointmentData.parentGender || !appointmentData.counsellorId || !appointmentData.date) {
            return res.status(400).json("Missing required fields in the request");
        }
        await bookappointments.insertOne(appointmentData);
        conn.close();
        res.status(200).json("Appointment booked successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

app.post('/feedback', async(req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWD');
        const feedbackCollection = db.collection('feedback');
        client.connect()
        const feedbackData = req.body;

        if ( !feedbackData.feedback) {
            return res.status(400).json("Missing required fields in the request");
        }
        // Additional validation or processing if needed
        await feedbackCollection.insertOne(feedbackData);
        conn.close();
        res.status(200).json("Feedback submitted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

app.listen(8081)
console.log("server running")

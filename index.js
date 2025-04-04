const express = require('express');
const { resolve } = require('path');
const {Model} =require("./Model")
const {connection} =require('./connection')
const bcrypt =require('bcrypt')

const app = express();
const port = 3010;
app.use(express.json())

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post("/login",async(req,res)=>{
  const {mail,password}=req.body;
  try {
    if(!mail || !password){
      res.status(400).json({ status: true, message: "All feilds requrieded" })
    }
    let user=await Model.findOne({mail})
    if(!user){
      res.status(400).json({ status: true, message: "Please signup" })
    }
    await bcrypt.compare(password,user.password,(err,result)=>{
      if(err){
        res.status(500).json({ status: true, message: "Internal Server error" });
      }
      if(!result){
        res.status(400).json({ status: true, message: "password is incorret" });
      }
      res.status(200).json({ status: true, message: "Login sucessfull" })
    })
    
  } catch (error) {
      console.log(error)
  }
})



app.listen(port, () => {

  connection

  console.log(`Example app listening at http://localhost:${port}`);
});

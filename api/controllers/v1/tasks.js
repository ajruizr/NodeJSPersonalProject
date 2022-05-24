const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { tasks } = require('../../db/entities');
const jwt=require('jsonwebtoken');

router.post('/',async (req,res)=>{//method to get the post from form to insert a new task
    const data=req.body;
    const datas= await tasks.insert(data.name,data.description,data.due_date);
    if (datas) {
        res.status(200)
        res.send(datas);
      } else {
        res.sendStatus(404);
    }
})


router.get('/', async (req, res) => {//method to get all tasks
  try {
    const data = await tasks.all();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
})

router.get('/size',async(req, res) => {//method to get the size of table tasks
  try {
    const data = await tasks.size();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
}) 
//simulating login example with JWT
router.post('/login',async (req,res) =>{
  try {
    const user={
      id:1,
      alias: "Alan",
      email: "example@example.com"
    };
    jwt.sign({user},'secretkey', (err,token)=>{
      res.json({
        token
      });
    });
  } catch (error) {
    res.sendStatus(500);
  }
})
router.post('/logincheck',verifyToken ,async (req,res)=>{
  try {
    jwt.verify(req.token,'secretkey',(err,authData)=>{
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "Approved Login",
          authData
        });
      }
    });
    
  } catch (error) {
    res.sendStatus(500);

  }
})

router.delete('/:id',(req,res)=>{//method to delete a task
    const id=req.params.id;
    const data= tasks.delete(id);
    if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
    }
})

//function to verify JWT
function verifyToken(req,res,next){
  const bearerHeader = req.body.headers['Authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = router;
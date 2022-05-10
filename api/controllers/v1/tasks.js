const express = require('express');
const router = express.Router();
const { tasks } = require('../../db/entities');

router.post('/',(req,res)=>{//method to get the post from form to insert a new task
    const name= req.params.name;
    const description=req.params.description;
    const due_date=req.params.due_date;
    const data=  tasks.insert(name,description,due_date);
    if (data) {
        res.sendStatus(200);
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

router.delete('/:id',(req,res)=>{//method to delete a task
    const id=req.params.id;
    const data= tasks.delete(id);
    if (data) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
    }
})
module.exports = router;
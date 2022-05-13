const express = require('express');
const router = express.Router();
const { tasks } = require('../../db/entities');

router.use(express.json());
router.post('/',(req,res)=>{//method to get the post from form to insert a new task
    const data=req.body;
    const datas= tasks.insert(data.name,data.description,data.due_date);
    if (datas) {
        res.status(200)
        res.send(data);
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
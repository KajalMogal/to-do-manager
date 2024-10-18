const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/todoDb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected!');
});

app.use(express.json());

//WORKING FINE  Route //crate user
app.post('/users', async (req, res) => {  
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// WORKING FINE  Routes //add tasks 
 app.post('/users/:id/tasks', async (req, res) => {  
     const user = await User.findById(req.params.id);  //find that user
     if(!user) {
        return res.status(404).json({ message: 'User not found!'});
     }
     const task = new Task({   //create new instance
        userId: user._id,
        description: req.body.description,
     });
    // user.tasks.push(task); 
     await task.save();
     await user.save();
   res.status(201).json(task);
 });

// WORKING FINE //list all task associted with perticular userId
  app.get('/users/:id/tasks', async(req, res) => {
     const userId = await User.findById(req.params.id);
     const tasks = await Task.find({ userId });  //fetch tasks for perticular userid
     if(!tasks.length) {
        return res.status(404).json({ message: 'Task not found !'});
     }
      res.json(tasks);
  });

// WORKING FINE //update tasks
 app.put('/users/:id/tasks/:taskId', async(req, res) => {
     const { id, taskId } = req.params;
     const { description, completed } = req.body;
        const task = await Task.findByIdAndUpdate(taskId, { description, completed }, { new: true });
     
     if(!task) {
         return res.status(404).json({ message: 'Task not found !'})
     }
     res.json(task); 
 }); 

// delete task 
 app.delete('/users/:id/tasks/:taskId', async(req, res) => {
     const { userId, taskId } = req.params;
     //await User.findByIdAndUpdate(id, { $pull: {  tasks: taskId }});
     const task = await Task.findByIdAndDelete({ _id: taskId, userId: userId });
     if(!task) {
        return res.status(404).json({ message: 'Task not found' });
     }
     res.status(200).json({ message: 'Task deleted successfully '});
 });

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

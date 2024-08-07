const express = require('express');
const Task = require('../model/Task');
const TaskController = express.Router();


TaskController.post('/tasks/:id', async (req, res) => {
  const { title, description, dueDate,completed } = req.body;
  const userid= req.params.id

  
  try {
    const newTask = new Task({
      user: userid,
      title,
      description,
      completed,
      dueDate,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


TaskController.get('/tasks/:id', async (req, res) => {
  const userid = req.params.id;
  const condition = req.query.condition;
  let query = { user: userid };


  switch (condition) {
    case 'today':
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.createdAt = { $gte: today, $lt: tomorrow };
      break;
    case 'completed':
      query.completed = 'true';
      break;
    case 'incomplete':
      query.completed = { $ne: 'true' };
      break;
    default:
      break;
  }

  try {
    const tasks = await Task.find(query).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


TaskController.put('/edittasks/:id', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, { $set: { title, description, dueDate, completed } }, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


TaskController.delete('/tasks/:id', async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = TaskController;

const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
const task = await Task.create({
  title,
  description,
  priority,
  dueDate,
  user: req.userId
});

};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const task = await Task.findOneAndUpdate({ _id: id, user: req.userId }, updates, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json({ message: 'Task deleted' });
};

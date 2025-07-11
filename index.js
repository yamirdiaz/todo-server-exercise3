import express from "express"
import cors from 'cors'
import  { v4 as uuid }  from 'uuid'

const server = express();
server.use(cors());
server.use(express.json());

let tasks = []; // in-memory store

// List all tasks
server.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Create a new task
server.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const task = { id: uuid(), title };
    tasks.push(task);
    res.status(201).json(task);
});

// Delete a task
server.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const before = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    if (tasks.length === before) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

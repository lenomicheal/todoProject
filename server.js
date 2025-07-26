const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

// Use environment variables for deployment
const port = process.env.PORT || 3020
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todoList'

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.once('open', () => {
    console.log("✅ MongoDB connected successfully to database: todoList")
    console.log("📊 Collection name: todos")
})

db.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err)
})

db.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected')
})

const todoSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: String,
    deadline: String,
    isCompleted: { type: Boolean, default: false },
    completedAt: Date,  
    description: { type: String, default: '' },     
    createdAt: { type: Date, default: Date.now }
})

const Todo = mongoose.model("Todo", todoSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'))
})

// Test route for form data
app.post('/api/test-form', (req, res) => {
    console.log('Form data received:')
    console.log('Body:', req.body)
    console.log('Content-Type:', req.headers['content-type'])
    res.json({ 
        message: 'Form data received',
        data: req.body,
        contentType: req.headers['content-type']
    })
})

// Add new task
app.post('/api/tasks', async (req, res) => {
    try {
        console.log('Raw request body:', req.body)
        console.log('Content-Type:', req.headers['content-type'])
        
        const { taskName, description, deadline } = req.body
        console.log('Extracted data:', { taskName, description, deadline })
        console.log('Description type:', typeof description)
        console.log('Description value:', description)
        
        const todo = new Todo({
            taskName,
            description: description || '', // Ensure description is always a string
            deadline
        })
        
        console.log('Todo object before save:', todo)
        await todo.save()
        console.log('Task saved successfully to MongoDB:', todo)
        res.json({ success: true, task: todo })
    } catch (error) {
        console.error('Error saving task:', error)
        res.status(500).json({ success: false, error: 'Error saving task' })
    }
})

// Test route to check database
app.get('/api/test', async (req, res) => {
    try {
        const count = await Todo.countDocuments()
        const allTasks = await Todo.find()
        res.json({
            message: 'Database connection working',
            totalTasks: count,
            tasks: allTasks,
            database: 'todoList',
            collection: 'todos'
        })
    } catch (error) {
        console.error('Database test error:', error)
        res.status(500).json({ error: 'Database test failed', details: error.message })
    }
})

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Todo.find().sort({ createdAt: -1 })
        res.json(tasks)
    } catch (error) {
        console.error('Error fetching tasks:', error)
        res.status(500).json({ error: 'Error fetching tasks' })
    }
})

// Get completed tasks
app.get('/api/tasks/completed', async (req, res) => {
    try {
        const completedTasks = await Todo.find({ isCompleted: true }).sort({ completedAt: -1 })
        res.json(completedTasks)
    } catch (error) {
        console.error('Error fetching completed tasks:', error)
        res.status(500).json({ error: 'Error fetching completed tasks' })
    }
})

// Update task status (mark as completed/incomplete)
app.put('/api/tasks/:id/status', async (req, res) => {
    try {
        const { id } = req.params
        const { isCompleted } = req.body
        
        const updateData = { isCompleted }
        if (isCompleted) {
            updateData.completedAt = new Date()
        } else {
            updateData.completedAt = null
        }
        
        const task = await Todo.findByIdAndUpdate(id, updateData, { new: true })
        res.json({ success: true, task })
    } catch (error) {
        console.error('Error updating task status:', error)
        res.status(500).json({ success: false, error: 'Error updating task status' })
    }
})

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params
        await Todo.findByIdAndDelete(id)
        res.json({ success: true })
    } catch (error) {
        console.error('Error deleting task:', error)
        res.status(500).json({ success: false, error: 'Error deleting task' })
    }
})

app.listen(port, () => {
    console.log("Server starts on port", port)
})




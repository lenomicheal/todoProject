const mongoose = require('mongoose');

async function checkDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/todoList', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB');
        
        // Define the schema and model
        const todoSchema = new mongoose.Schema({
            taskName: { type: String, required: true },
            description: String,
            deadline: String,
            isCompleted: { type: Boolean, default: false },
            completedAt: Date,
            createdAt: { type: Date, default: Date.now }
        });
        
        const Todo = mongoose.model("Todo", todoSchema);
        
        // Check all databases
        const adminDb = mongoose.connection.db.admin();
        const dbList = await adminDb.listDatabases();
        console.log('\n📊 Available Databases:');
        dbList.databases.forEach(db => {
            console.log(`   - ${db.name} (${db.sizeOnDisk} bytes)`);
        });
        
        // Check collections in todoList database
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📁 Collections in todoList database:');
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });
        
        // Count documents in todos collection
        const count = await Todo.countDocuments();
        console.log(`\n📈 Total tasks in 'todos' collection: ${count}`);
        
        // Show all tasks
        const tasks = await Todo.find();
        console.log('\n📋 All Tasks:');
        tasks.forEach((task, index) => {
            console.log(`\n   Task ${index + 1}:`);
            console.log(`   - ID: ${task._id}`);
            console.log(`   - Name: ${task.taskName}`);
            console.log(`   - Description: ${task.description || 'No description'}`);
            console.log(`   - Deadline: ${task.deadline || 'No deadline'}`);
            console.log(`   - Completed: ${task.isCompleted}`);
            console.log(`   - Created: ${task.createdAt}`);
        });
        
        // MongoDB Compass connection info
        console.log('\n🔗 MongoDB Compass Connection Info:');
        console.log('   Connection String: mongodb://127.0.0.1:27017');
        console.log('   Database: todoList');
        console.log('   Collection: todos');
        console.log('\n   Steps to view in Compass:');
        console.log('   1. Open MongoDB Compass');
        console.log('   2. Connect to: mongodb://127.0.0.1:27017');
        console.log('   3. Click on "todoList" database');
        console.log('   4. Click on "todos" collection');
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB');
    }
}

checkDatabase(); 
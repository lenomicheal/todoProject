# Todo Application

A complete todo application with CRUD operations built with Node.js, Express, and MongoDB.

## Features

- ✅ Add tasks with name, description, and deadline
- ✅ Mark tasks as completed/incomplete
- ✅ Delete tasks
- ✅ View all tasks and completed tasks separately
- ✅ Real-time updates
- ✅ Professional UI design

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB locally or set up MongoDB Atlas
4. Run the application:
   ```bash
   npm start
   ```
5. Open http://localhost:3020

## Deployment Options

### Option 1: Render (Recommended - Free)

1. **Sign up** at [render.com](https://render.com)
2. **Connect your GitHub** repository
3. **Create a new Web Service**
4. **Configure:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables:
     - `MONGODB_URI`: Your MongoDB connection string

### Option 2: Heroku

1. **Install Heroku CLI**
2. **Login and create app:**
   ```bash
   heroku login
   heroku create your-todo-app
   ```
3. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   ```
4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: Railway

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub** repository
3. **Add environment variables:**
   - `MONGODB_URI`: Your MongoDB connection string
4. **Deploy automatically**

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Free)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Use it as `MONGODB_URI` environment variable

### Option 2: Local MongoDB
- Install MongoDB locally
- Use default connection: `mongodb://127.0.0.1:27017/todoList`

## Environment Variables

- `PORT`: Server port (default: 3020)
- `MONGODB_URI`: MongoDB connection string

## API Endpoints

- `GET /` - Serve the main page
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/completed` - Get completed tasks
- `PUT /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/test` - Test database connection

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: HTML, CSS, JavaScript
- **Deployment**: Render/Heroku/Railway 
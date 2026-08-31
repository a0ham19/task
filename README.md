# To-Do Web App

A full-stack to-do application built with React on the frontend and Express + Sequelize on the backend, using MySQL as the database.

## Features

- Add new tasks
- Delete tasks
- View all tasks from the database
- REST API backend for task management
- Docker support for MySQL and backend services
- Responsive and simple UI

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MySQL
- ORM: Sequelize
- Containerization: Docker Compose

## Project Structure

```text
To-do-web-app/
├── ARCHITECTURE.md
├── Backend/
│   ├── config.json
│   ├── db.js
│   ├── docker-compose.yml
│   ├── package.json
│   ├── server.js
│   ├── Todo.js
│   ├── todoController.js
│   └── todoRoutes.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   └── public/
└── README.md
```

## Prerequisites

Before running the app, make sure you have installed:

- Node.js 18+
- npm
- MySQL (or Docker)

## Backend Setup

1. Open a terminal in the `Backend` folder:

```bash
cd Backend
npm install
```

2. Create or configure your MySQL database.

3. Start the server:

```bash
npm start
```

The backend will run on:

- http://localhost:3000

### Backend API

```http
GET /todos
POST /todos
DELETE /todos/:id
```

Example request:

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn React"}'
```

## Frontend Setup

1. Open a terminal in the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

2. Open the local Vite URL shown in the terminal, usually:

- http://localhost:5173

## Docker Setup

The project includes a `docker-compose.yml` file for MySQL and backend services.

```bash
cd Backend
docker compose up --build
```

This starts:

- MySQL database on port `3307`
- Backend server on port `3000`

## Environment Variables

The backend uses the following defaults if no environment variables are provided:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456789
DB_NAME=mydb
DB_DIALECT=mysql
PORT=3000
```

## Notes

- The backend auto-syncs the `todos` table with Sequelize on startup.
- The frontend currently fetches the API from `http://localhost:3000`.
- The app is a simple task manager suitable for learning full-stack integration.

## License

This project is for educational purposes.

## Author

Built as a full-stack web application project for learning and practice.

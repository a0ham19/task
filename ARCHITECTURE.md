# 🏗️ C4 Architecture Documentation - To-Do App

## 📊 Technology Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express 5
- **ORM**: Sequelize 6
- **Database**: MySQL
- **Ports**: Frontend (5173), Backend (3000)

---

## Level 1: System Context Diagram

Shows who interacts with the system.

```mermaid
graph TD
    User[👤 User] -->|Manages tasks| App[📱 To-Do App]
    App -->|Reads/Writes| DB[(🗄️ MySQL Database\nDatabase: todo__app)]
```

---

## Level 2: Container Diagram

Shows the high-level technology choices with exact ports.

```mermaid
graph TD
    subgraph "User's Browser"
        FE[🖥️ React Frontend\nVite + React 19\nPort: 5173]
    end

    subgraph "Server"
        BE[⚙️ Express.js Backend\nNode.js\nPort: 3000]
    end

    subgraph "Storage"
        DB[(🗄️ MySQL Database\ntodo__app\nHost: 192.168.1.175)]
    end

    FE -->|REST API Calls\nHTTP/JSON| BE
    BE -->|Sequelize ORM\nMySQL2 Driver| DB
```

---

## Level 3: Component Diagram (Backend)

Shows the internal structure of your backend based on actual `server.js`.

```mermaid
graph TD
    subgraph "Backend Application (server.js)"
        Router[🛣️ Express Router]

        subgraph "Controllers"
            TodoCtrl[📝 Todo Controller\nCRUD Operations]
        end

        subgraph "Models"
            TodoModel[📋 Todo Model\nSequelize Definition]
        end

        subgraph "Database Layer"
            Sequelize[🔗 Sequelize ORM\nDatabase: todo__app]
            DBConfig[(📄 Database Config\nHost: 192.168.1.175)]
        end

        subgraph "Middleware"
            JSON[express.json Middleware]
            CORS[cors Middleware]
            ErrorHandler[404 Error Handler]
        end
    end

    Router -->|GET /todos| TodoCtrl
    Router -->|GET /todos/:id| TodoCtrl
    Router -->|POST /todos| TodoCtrl
    Router -->|PUT /todos/:id| TodoCtrl
    Router -->|DELETE /todos/:id| TodoCtrl

    TodoCtrl -->|CRUD Operations| TodoModel
    TodoModel -->|Sequelize Model| Sequelize
    Sequelize -->|Connection| DBConfig

    Router --> JSON
    Router --> CORS
    Router --> ErrorHandler
```

---

## Level 4: Code/Entity Diagram (Database Schema)

Shows your actual database structure based on `server.js`.

```mermaid
erDiagram
    TODO {
        INT id PK
        VARCHAR(255) title
        BOOLEAN is_completed
    }
````

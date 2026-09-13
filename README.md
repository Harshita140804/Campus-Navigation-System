🛰️ Campus Navigation System

A full-stack web application that helps users find the shortest walking route between different locations on a campus.

I built this project to understand how **Dijkstra's Algorithm** can be used in a real application. It uses React for the frontend, Node.js and Express for the backend, and MySQL for storing the data.

The recommended route is also shown on an interactive SVG campus map.

## Features

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Select starting point and destination
- Find the shortest route using Dijkstra's Algorithm
- Show total distance
- Show estimated walking time
- Interactive SVG campus map
- Highlight the selected route on the map
- Animated route preview
- Simple space-themed UI using plain CSS

## Tech Stack

| Part | Technology |
|---|---|
| Frontend | React.js, Vite |
| Styling | Plain CSS |
| Map | SVG |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Authentication | JWT, bcrypt |
| Algorithm | Dijkstra's Algorithm |

## How It Works

The basic flow of the project is:

```text
React Frontend
      |
      | HTTP Request
      ↓
Node.js + Express Backend
      |
      | SQL Query
      ↓
MySQL Database
````

The frontend handles the user interface, location selection, login/register, route results, and the SVG map.

The backend handles API requests, authentication, database queries, graph creation, and Dijkstra's Algorithm.

The MySQL database stores locations, routes, distances, and user details.

## Project Structure

```text
campus-navigation-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── locationRoutes.js
│   │   └── navigationRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── utils/
│   │   └── dijkstra.js
│   │
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Login.jsx
        │   └── CampusMap.jsx
        │
        ├── App.jsx
        └── App.css
```

## Database

The project uses three tables.

### locations

Stores the campus locations.

```text
id
name
```

### routes

Stores the connection between two locations and the distance between them.

```text
id
source_id
destination_id
distance
```

### users

Stores registered users.

```text
id
username
password
```

Passwords are stored as bcrypt hashes instead of plain text.

## Graph Representation

The locations and routes in the database are used as a graph.

* Each location is a node
* Each route is an edge
* Distance is the weight of the edge

For example:

```text
Main Gate ----120m---- Library
     |
    200m
     |
 Cafeteria ----100m---- Admin Block
                          |
                         180m
                          |
                       Hostel
```

The backend gets this information from MySQL and converts it into a graph before running Dijkstra's Algorithm.

## Dijkstra's Algorithm

I used Dijkstra's Algorithm to find the shortest route between two locations.

The basic steps are:

1. Start from the selected location.
2. Give it a distance of `0`.
3. Give all other locations a distance of `Infinity`.
4. Find the closest unvisited location.
5. Check its connected locations.
6. Update the distance if a shorter route is found.
7. Repeat until the destination is reached.
8. Reconstruct the final path.

For example, if the user selects:

```text
From: Main Gate
To: Hostel
```

The result can be:

```text
Main Gate → Library → Admin Block → Hostel

Distance: 450 meters
Estimated Time: 6 minutes
```

## Time Complexity

The current implementation uses a simple loop to find the closest unvisited location.

```text
O(V²)
```

where `V` is the number of locations.

For a larger graph, the algorithm can be improved by using a priority queue.

## Authentication

The project has a simple registration and login system using JWT and bcrypt.

### Registration

When a user registers:

```text
Username + Password
        ↓
Password is hashed using bcrypt
        ↓
Hash is stored in MySQL
```

The original password is not stored in the database.

### Login

When a user logs in:

```text
Username + Password
        ↓
Backend checks the user
        ↓
bcrypt checks the password
        ↓
JWT token is created
```

The JWT token is then used to access protected routes.

The token is valid for 1 hour.

## API Endpoints

### Register

```http
POST /api/auth/register
```

Creates a new user account.

### Login

```http
POST /api/auth/login
```

Logs the user in and returns a JWT token.

### Get Locations

```http
GET /api/locations
```

Returns the available campus locations.

### Get Routes

```http
GET /api/navigation/routes
```

Returns the routes stored in the database.

### Find Shortest Path

```http
GET /api/navigation/shortest-path?from=Main%20Gate&to=Hostel
```

Returns the shortest path, total distance, and estimated walking time.

Example response:

```json
{
  "path": [
    "Main Gate",
    "Library",
    "Admin Block",
    "Hostel"
  ],
  "totalDistance": 450,
  "estimatedTimeMinutes": 6
}
```

## Walking Time

The project uses an average walking speed of 80 meters per minute.

The calculation is:

```text
Walking Time = Distance / 80
```

For example:

```text
450 / 80 = 5.6 minutes
```

The application rounds this to about 6 minutes.

This is only an estimate and does not consider things like crowding, stairs, or elevation.

## Setup

### Requirements

You need:

* Node.js
* npm
* MySQL

### 1. Clone the Project

```bash
git clone https://github.com/your-username/campus-navigation-system.git

cd campus-navigation-system
```

### 2. Create the Database

Open MySQL and run:

```sql
CREATE DATABASE campus_navigation;

USE campus_navigation;
```

Create the `locations` table:

```sql
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
```

Create the `routes` table:

```sql
CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source_id INT NOT NULL,
    destination_id INT NOT NULL,
    distance FLOAT NOT NULL,
    FOREIGN KEY (source_id) REFERENCES locations(id),
    FOREIGN KEY (destination_id) REFERENCES locations(id)
);
```

Create the `users` table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
```

### 3. Add Sample Data

```sql
INSERT INTO locations (name)
VALUES
('Main Gate'),
('Library'),
('Cafeteria'),
('Admin Block'),
('Hostel'),
('Sports Ground');
```

```sql
INSERT INTO routes (source_id, destination_id, distance)
VALUES
(1, 2, 120),
(1, 3, 200),
(2, 4, 150),
(3, 4, 100),
(4, 5, 180),
(3, 6, 220);
```

### 4. Start the Backend

Go to the backend folder:

```bash
cd backend
```

Install the packages:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campus_navigation
PORT=5000
JWT_SECRET=your_secret_key_here
```

Start the backend:

```bash
npx nodemon server.js
```

### 5. Start the Frontend

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install the packages:

```bash
npm install
```

Start the React app:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

Register an account, log in, select two locations, and find the shortest route.

## Limitations

* Locations and routes are added manually in the database.
* There is no admin panel yet.
* SVG map coordinates are manually set.
* Walking time is only an estimate.
* The current Dijkstra implementation is `O(V²)`.
* The project does not use real GPS.
* The campus map is a simple schematic map and not a real map.
* Routes do not change based on real-world conditions.

## Future Improvements

* Add an admin panel to add and edit locations and routes.
* Use a priority queue to improve Dijkstra's Algorithm.
* Add real GPS support.
* Add a real campus map.
* Improve walking-time calculation.
* Add more campus locations.
* Allow routes to be updated dynamically.

## What I Learned

While building this project, I got practical experience with:

* React
* Node.js and Express
* REST APIs
* MySQL
* JWT authentication
* bcrypt
* Graphs and adjacency lists
* Dijkstra's Algorithm
* SVG
* Connecting frontend, backend, and database

The main thing I wanted to learn from this project was how a **DSA concept can be used in a real application** instead of using it only for coding problems.

## License

This project was built for educational purposes as a personal learning project.

```


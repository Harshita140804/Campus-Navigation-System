🛰️ Campus Navigation System

A full-stack web application that helps users find the shortest walking route between locations on a campus. Built with a focus on applying Dijkstra's Algorithm to a real, interactive full-stack project — combining a graph-based backend with a React frontend that visualizes the recommended route on an interactive SVG map.

 Features
 User Authentication — Register and log in securely using JWT tokens and bcrypt-hashed passwords.
 Location Selection — Pick a starting point and destination from dynamically loaded dropdowns.
 Shortest Path Calculation — Uses Dijkstra's Algorithm to calculate the shortest walking route based on real distance data.
 Distance & Time Estimation — Displays total distance and an estimated walking time for the recommended route.
 Interactive Campus Map — A simple SVG-based schematic map that visually highlights the selected route, with distinct colors for the start, destination, and path.
 Animated Route Preview — A small animated icon travels along the calculated route while the path draws itself in real time.
 Space-Themed UI — A clean, subtle dark "universe" theme built entirely with plain CSS — no UI frameworks.
 
Tech Stack
Layer	Technology
Frontend	React.js (Vite), Plain CSS, SVG
Backend	Node.js, Express.js
Database	MySQL
Algorithm	Dijkstra's Algorithm (custom implementation)
Authentication	JWT (jsonwebtoken), bcrypt

Architecture
React Frontend (Vite)
       ↓  fetch() — HTTP requests
Node.js + Express Backend
       ↓  mysql2 — SQL queries
MySQL Database
Frontend handles the UI: login/register, location dropdowns, results display, and the animated SVG map.
Backend exposes a REST API, handles authentication, queries the database, builds the graph, and runs Dijkstra's Algorithm.
Database stores campus locations, the paths between them, and registered users.

📂 Project Structure
campus-navigation-system/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MySQL connection pool
│   ├── routes/
│   │   ├── authRoutes.js         # Register / Login
│   │   ├── locationRoutes.js     # Fetch all locations
│   │   └── navigationRoutes.js   # Fetch routes + shortest-path endpoint
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── utils/
│   │   └── dijkstra.js           # Dijkstra's Algorithm + buildGraph()
│   └── server.js                 # App entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Login.jsx         # Register/Login form
        │   └── CampusMap.jsx     # Interactive SVG campus map
        ├── App.jsx               # Main app logic & state
        └── App.css               # Styling (space theme)
 Database Schema

locations

Column	Type	Description
id	INT, PK, AUTO_INCREMENT	Unique location ID
name	VARCHAR(100), UNIQUE	Location name

routes

Column	Type	Description
id	INT, PK, AUTO_INCREMENT	Unique route ID
source_id	INT, FK → locations.id	One end of the connection
destination_id	INT, FK → locations.id	Other end of the connection
distance	FLOAT	Distance in meters

users

Column	Type	Description
id	INT, PK, AUTO_INCREMENT	Unique user ID
username	VARCHAR(50), UNIQUE	Login username
password	VARCHAR(255)	bcrypt-hashed password

Locations and routes together form a weighted, undirected graph — locations are nodes, routes are edges, and distance is the edge weight.

Setup & Installation
Prerequisites
Node.js and npm installed
MySQL server installed and running
1. Clone the repository
bash
git clone https://github.com/your-username/campus-navigation-system.git
cd campus-navigation-system
2. Set up the database
sql
CREATE DATABASE campus_navigation;
USE campus_navigation;

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source_id INT NOT NULL,
    destination_id INT NOT NULL,
    distance FLOAT NOT NULL,
    FOREIGN KEY (source_id) REFERENCES locations(id),
    FOREIGN KEY (destination_id) REFERENCES locations(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

Insert some sample locations and routes to get started:

sql
INSERT INTO locations (name) VALUES
('Main Gate'), ('Library'), ('Cafeteria'),
('Admin Block'), ('Hostel'), ('Sports Ground');

INSERT INTO routes (source_id, destination_id, distance) VALUES
(1, 2, 120), (1, 3, 200), (2, 4, 150),
(3, 4, 100), (4, 5, 180), (3, 6, 220);
3. Set up the backend
bash
cd backend
npm install

Create a .env file inside backend/:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campus_navigation
PORT=5000
JWT_SECRET=your_secret_key_here

Start the backend:

bash
npx nodemon server.js
4. Set up the frontend
bash
cd ../frontend
npm install
npm run dev
5. Open the app

Visit http://localhost:5173 in your browser, register an account, log in, and start finding routes.

 How the Shortest Path Is Calculated
The frontend sends the selected start and destination to the backend.
The backend fetches all locations and routes from MySQL.
buildGraph() converts this raw data into an adjacency list — a JavaScript object mapping each location to its neighbors and distances.
dijkstra() runs on this graph, tracking the shortest known distance to every node and reconstructing the path once the destination is reached.
The backend calculates total distance and estimated walking time, then returns everything as JSON.
The frontend displays the result as text and animates the route on the SVG map.

Time complexity: O(V²) — the current implementation scans all nodes at each step to find the closest unvisited one. This could be optimized to O((V+E) log V) using a priority queue for larger graphs.

 Authentication Flow
Register: Password is hashed with bcrypt before being stored — plain-text passwords are never saved.
Login: The typed password is compared against the stored hash using bcrypt.compare(). On success, a JWT token is issued, valid for 1 hour.
Protected Routes: The shortest-path endpoint is protected by custom middleware that verifies the JWT token sent in the Authorization header before allowing access.
 Known Limitations & Future Improvements
Locations and routes are predefined in the database rather than added through an admin interface.
Map coordinates are manually hardcoded rather than dynamically generated.
Walking time is estimated using an average speed constant, not real-world factors like elevation or crowding.
The Dijkstra implementation is O(V²); a priority-queue-based version would scale better for much larger graphs.
No real GPS or live map integration — this is a schematic representation of a campus, not real-world coordinates.
 License

This project was built for educational purposes as part of a personal learning project.

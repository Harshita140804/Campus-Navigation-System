
# Campus Navigation System

A full-stack web application that helps users find the shortest walking route between different locations on a campus.

I built this project to understand how **Dijkstra's Algorithm** can be used in a real application. The project uses React for the frontend, Node.js and Express for the backend, and MySQL for storing campus data.

The shortest route is shown on an interactive SVG campus map.

## Features

- User registration and login using JWT and bcrypt
- Select starting point and destination
- Find the shortest route using Dijkstra's Algorithm
- Show total distance and estimated walking time
- Interactive SVG campus map
- Animated route preview
- Simple space-themed UI using plain CSS

## Tech Stack

- React.js + Vite
- Node.js + Express.js
- MySQL
- JWT + bcrypt
- Dijkstra's Algorithm
- SVG
- Plain CSS

## How It Works

```text
React Frontend
      ↓
Node.js + Express
      ↓
MySQL Database
      ↓
Dijkstra's Algorithm
      ↓
Shortest Route
      ↓
Interactive SVG Map
````

Campus locations are treated as **nodes**, routes as **edges**, and distance as the **weight** of each edge.

The backend gets the locations and routes from MySQL, builds the graph, and uses Dijkstra's Algorithm to find the shortest path.

## Project Structure

```text
campus-navigation-system/
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        ├── App.jsx
        └── App.css
```

## Running the Project Locally

### Requirements

* Node.js
* npm
* MySQL

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=campus_navigation
PORT=5000
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npx nodemon server.js
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Time Complexity

The current Dijkstra implementation has:

```text
O(V²)
```

For larger graphs, it can be improved using a priority queue.

## Limitations

* Locations and routes are added manually.
* The SVG map coordinates are manually set.
* Walking time is only an estimate.
* No real GPS or live map is used.
* The current Dijkstra implementation is `O(V²)`.

## Future Improvements

* Add an admin panel for locations and routes
* Use a priority queue for Dijkstra's Algorithm
* Add real GPS support
* Integrate a real campus map
* Improve walking-time calculation

## What I Learned

This project helped me get practical experience with **React, Node.js, Express, MySQL, REST APIs, JWT, bcrypt, SVG, graphs, and Dijkstra's Algorithm**.

My main goal was to understand how a DSA concept can be used to solve a real-world problem.

## License

This project was built for educational purposes as a personal learning project.




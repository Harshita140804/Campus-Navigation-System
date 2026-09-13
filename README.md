🛰️ # Campus Navigation System

A full-stack web application that helps users find the shortest walking route between locations on a campus.

The project focuses on applying **Dijkstra's Algorithm** to a real-world problem. It combines a graph-based backend with a React frontend that visualizes the recommended route on an interactive SVG campus map.

---

## Features

### User Authentication
- User registration and login
- Passwords securely hashed using `bcrypt`
- JWT-based authentication
- Protected navigation routes

### Location Selection
- Select a starting location from a dropdown
- Select a destination from a dropdown
- Locations are dynamically loaded from the database

### Shortest Path Calculation
- Uses Dijkstra's Algorithm to find the shortest route
- Calculates the route based on distance between locations
- Reconstructs and returns the complete path

### Distance and Time Estimation
- Displays the total walking distance
- Displays estimated walking time
- Walking time is calculated using an average walking speed

### Interactive Campus Map
- SVG-based schematic campus map
- Displays campus locations and connections
- Highlights the calculated shortest route
- Start and destination locations are visually different

### Animated Route Preview
- The selected route is animated on the SVG map
- A small animated icon moves along the calculated route
- The route is drawn progressively during the animation

### Space-Themed UI
- Simple dark universe-inspired design
- Built using plain CSS
- No UI frameworks or Tailwind CSS
- Designed to remain simple and beginner-friendly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite |
| Styling | Plain CSS |
| Graphics | SVG |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Database Driver | mysql2 |
| Algorithm | Dijkstra's Algorithm |
| Authentication | JWT, bcrypt |

---

## Architecture

```text
React Frontend
      |
      | fetch() - HTTP Requests
      ↓
Node.js + Express Backend
      |
      | mysql2 - SQL Queries
      ↓
MySQL Databaseactors like elevation or crowding.
The Dijkstra implementation is O(V²); a priority-queue-based version would scale better for much larger graphs.
No real GPS or live map integration — this is a schematic representation of a campus, not real-world coordinates.
 License

This project was built for educational purposes as part of a personal learning project.

function dijkstra(graph, startNode, endNode) {
    // Step 1: Set up tracking structures
    const distances = {};      // shortest known distance to each node
    const previous = {};       // to reconstruct the path later
    const visited = new Set(); // nodes we've finalized

    // Step 2: Initialize all distances as infinity, except the start node
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[startNode] = 0;

    while (visited.size < Object.keys(graph).length) {
        // Step 3: Pick the unvisited node with the smallest known distance
        let currentNode = null;
        let smallestDistance = Infinity;

        for (const node in distances) {
            if (!visited.has(node) && distances[node] < smallestDistance) {
                smallestDistance = distances[node];
                currentNode = node;
            }
        }

        // If no reachable node is left, stop early
        if (currentNode === null) break;

        // We've found the shortest path to the end node — can stop early
        if (currentNode === endNode) break;

        visited.add(currentNode);

        // Step 4: Check all neighbors of the current node
        const neighbors = graph[currentNode] || [];
        for (const neighbor of neighbors) {
            if (visited.has(neighbor.node)) continue;

            const newDistance = distances[currentNode] + neighbor.distance;
            if (newDistance < distances[neighbor.node]) {
                distances[neighbor.node] = newDistance;
                previous[neighbor.node] = currentNode;
            }
        }
    }

    // Step 5: Reconstruct the path by walking backwards from endNode
    const path = [];
    let current = endNode;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    // If the start node isn't part of the reconstructed path, no path exists
    if (path[0] !== startNode) {
        return { path: [], distance: Infinity };
    }

    return { path, distance: distances[endNode] };
}


function buildGraph(locations, routes) {
    const graph = {};

    // Step 1: Create an empty entry for every location, by name
    for (const location of locations) {
        graph[location.name] = [];
    }

    // Step 2: Create a lookup so we can convert IDs -> names quickly
    const idToName = {};
    for (const location of locations) {
        idToName[location.id] = location.name;
    }

    // Step 3: Add edges in both directions (undirected graph)
    for (const route of routes) {
        const sourceName = idToName[route.source_id];
        const destName = idToName[route.destination_id];

        graph[sourceName].push({ node: destName, distance: route.distance });
        graph[destName].push({ node: sourceName, distance: route.distance });
    }

    return graph;
}

module.exports = { dijkstra, buildGraph };

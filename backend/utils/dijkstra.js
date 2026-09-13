function dijkstra(graph, startNode, endNode) {
    
    const distances = {};      
    const previous = {};       
    const visited = new Set(); 

    
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[startNode] = 0;

    while (visited.size < Object.keys(graph).length) {
        
        let currentNode = null;
        let smallestDistance = Infinity;

        for (const node in distances) {
            if (!visited.has(node) && distances[node] < smallestDistance) {
                smallestDistance = distances[node];
                currentNode = node;
            }
        }

        
        if (currentNode === null) break;

        
        if (currentNode === endNode) break;

        visited.add(currentNode);

        
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

    
    const path = [];
    let current = endNode;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    
    if (path[0] !== startNode) {
        return { path: [], distance: Infinity };
    }

    return { path, distance: distances[endNode] };
}


function buildGraph(locations, routes) {
    const graph = {};

    
    for (const location of locations) {
        graph[location.name] = [];
    }

    
    const idToName = {};
    for (const location of locations) {
        idToName[location.id] = location.name;
    }

    
    for (const route of routes) {
        const sourceName = idToName[route.source_id];
        const destName = idToName[route.destination_id];

        graph[sourceName].push({ node: destName, distance: route.distance });
        graph[destName].push({ node: sourceName, distance: route.distance });
    }

    return graph;
}

module.exports = { dijkstra, buildGraph };

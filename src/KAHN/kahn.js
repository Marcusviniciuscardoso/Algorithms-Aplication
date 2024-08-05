function topologicalSort(adj, V){
    const indegree = new Array(V).fill(0);
    for(let i = 0; i< V; i++){
        for (const vertex of adj[i]){
            indegree[vertex]++;
        }
    }

    const q = [];
    for (let i = 0; i < V; i++){
        if(indegree[i] === 0){
            q.push(i);
        }
    }

    const result = [];
    while (q.length > 0){
        const node = q.shift();
        result.push(node);

        for ( const adjacent of adj[node]){
            indegree[adjacent]--;
            if(indegree[adjacent] === 0) q.push(adjacent)
        }
    }
}

const n = 6;

const edges = [[0, 1], [1, 2], [2, 3], [4, 5], [5, 1], [5, 2]];

const adj = Array.from({ length: n }, () => []);

for (const edge of edges) {
    adj[edge[0]].push(edge[1]);
}

console.log("Topological sorting of the graph: ");
const result = topologicalSort(adj, n);

for (const vertex of result) {
    console.log(vertex + " ");
}
class Dijkstra{

    constructor() {
        this.coordenates = {};
    }

    /*
      Start: lat: -25.580250, lng: -49.401800
      A: -25.580937, -49.402739
      B: -25.581813, -49.400311
      C: -25.582552, -49.404863
      D:-25.584140, -49.403422
      End: -25.585303, -49.407109
    */

    graph = {
        Start: {A: 1, B: 2},
        A: {C: 2, D: 4},
        B: {A: 3, D: 3},
        C: {D: 2, End: 4},
        D: {End: 4},
        End: {}
    };
    
    setDijkstraValue(optimalPath){
        this.coordenates.origin  = optimalPath[0]
        this.coordenates.destination = optimalPath[-1]
    }

    getDijkstraValue(){
        return this.coordenates
    }
    
    dijkstraAlgorithm(graph) {
        const costs = Object.assign({End: Infinity}, graph.Start);
        const parents = {End: null};
        const processed = [];
    
        let node = this.findLowestCostNode(costs, processed);
    
        while (node) {
            let cost = costs[node];
            let children = graph[node];
            for (let n in children) {
                let newCost = cost + children[n];
                if (!costs[n] || costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                }
            }
            processed.push(node);
            node = this.findLowestCostNode(costs, processed);
        }
    
        let optimalPath = ['End'];
        let parent = parents.End;
        while (parent) {
            optimalPath.push(parent);
            parent = parents[parent];
        }
        optimalPath.reverse();
    
        this.setDijkstraValue(optimalPath)
        return {distance: costs.End, path: optimalPath};
    };

    findLowestCostNode(costs, processed) {
        return Object.keys(costs).reduce((lowest, node) => {
            if (lowest === null || costs[node] < costs[lowest]) {
                if (!processed.includes(node)) {
                    lowest = node;
                }
            }
            return lowest;
        }, null);
    };
    
}


export default Dijkstra;
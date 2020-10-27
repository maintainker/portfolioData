function solution(N, road, K) {
    const nodeList = new Array(N+1);
    if(N === 1){
        return 1;
    }
    let visitCount = 1;
    let deliverable = 0;
    for(let i = 1; i < nodeList.length ; i++){
        nodeList[i]={
            visit:false,
            adjacent:[],
            adjacentDis:[],
            root:0,
            totalDistance:600000
        }
    }
    for(let i in road){
        nodeList[road[i][0]].adjacent.push(road[i][1]);
        nodeList[road[i][1]].adjacent.push(road[i][0]);
        nodeList[road[i][0]].adjacentDis.push(road[i][2]);
        nodeList[road[i][1]].adjacentDis.push(road[i][2]);
        console.log(nodeList[road[i][0]].adjacent.join())
        console.log(nodeList[road[i][1]].adjacent.join())
    }
    const kruskal = (node)=>{
        const {adjacent,adjacentDis,totalDistance} = nodeList[node];
        nodeList[node].visit = true;
        visitCount++;
        if(totalDistance <= K){
            deliverable++;
        }
        if(visitCount===nodeList.length){
            return;
        }
        let minDistance = 600000;
        let minIdx = 0;
        for(let i in nodeList){
            if(!nodeList[i].visit){
                let adjacentIdx = adjacent.indexOf(Number(i));
                if(adjacentIdx !== -1&& nodeList[i].totalDistance>totalDistance+adjacentDis[adjacentIdx]){
                    nodeList[i].root = node;
                    nodeList[i].totalDistance = totalDistance+adjacentDis[adjacentIdx];
                }
                if(minDistance>nodeList[i].totalDistance){
                    minDistance = nodeList[i].totalDistance;
                    minIdx = Number(i);
                }
            }
        }
        kruskal(minIdx)
    }
    nodeList[1].root = 1;
    nodeList[1].totalDistance = 0;
    kruskal(1);
    console.log(nodeList)
    return deliverable;
}
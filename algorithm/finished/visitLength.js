function solution(dirs) {
    let currentNode = [0,0];
    let firstStepVertaxCount = 0;
    const commandDir = dirs.split("");
    const visitedNode = {
        node0_0:new Array(4)
    };
    const directionIdx = { //CW로 idx
        U:0,
        R:1,
        D:2,
        L:3
    }
    const direction = { 
        U:[0,1],
        R:[1,0],
        D:[0,-1],
        L:[-1,0]
    }

    for(let i in commandDir){
        const node = `node${currentNode[0]}_${currentNode[1]}`;
        const dir = commandDir[i];
        let move =true;
        currentNode[0] += direction[dir][0];
        currentNode[1] += direction[dir][1];
        if(Math.abs(currentNode[0])>5){
            move = false;
            currentNode[0] -= direction[dir][0];
        }
        if(Math.abs(currentNode[1])>5){
            move = false;
            currentNode[1] -= direction[dir][1];
        }
        const nextNode = `node${currentNode[0]}_${currentNode[1]}`;
        if(visitedNode[nextNode]===undefined){
            visitedNode[nextNode]=new Array(4);
        }
        if(move && visitedNode[node][directionIdx[dir]]!==true){
            firstStepVertaxCount++;
            visitedNode[node][directionIdx[dir]] = true;
            visitedNode[nextNode][(directionIdx[dir]+2)%4] = true;
        }
    }

    return firstStepVertaxCount;
}
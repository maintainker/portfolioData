function solution(land, height) {
    let groups = {};
    const visited = new Array(land.length)
    console.log(visited.length)
    for(let i = 0 ; i<visited.length;i++){
        visited[i] = new Array(land.length)
        for(let j =0;j<visited[i].length;j++){
            visited[i][j] = {
                visit: false,
                group: `${i}_${j}`,
                nextGroup: [
                    `${i+1}_${j}`,
                    `${i-1}_${j}`,
                    `${i}_${j+1}`,
                    `${i}_${j-1}`
                ],
            }
            if(i === 0){
                visited[i][j].nextGroup.splice(visited[i][j].nextGroup.indexOf(`${i-1}_${j}`),1);
            }else if(i === land.length -1){
                visited[i][j].nextGroup.splice(visited[i][j].nextGroup.indexOf(`${i+1}_${j}`),1);
            } 
            if(j === 0){
                visited[i][j].nextGroup.splice(visited[i][j].nextGroup.indexOf(`${i}_${j-1}`),1);
            }else if(j === land.length -1){
                visited[i][j].nextGroup.splice(visited[i][j].nextGroup.indexOf(`${i}_${j+1}`),1);
            }
        }
    };


    const grouping = (xIdx,yIdx) => {
        const nextGroup = [...visited[xIdx][yIdx].nextGroup];
        visited[xIdx][yIdx].visit = true;
        for(let i in nextGroup){
            const nextCoordX = Number(nextGroup[i][0]);
            const nextCoordY = Number(nextGroup[i][2]);
            if( !visited[nextCoordX][nextCoordY].visit && visited[xIdx][yIdx].group === visited[nextCoordX][nextCoordY].group){
            const nextCoordY = Number(nextGroup[i][2]);
                visited[xIdx][yIdx].nextGroup.splice(visited[xIdx][yIdx].nextGroup.indexOf(`${nextCoordX}_${nextCoordY}`),1);
                visited[nextCoordX][nextCoordY].nextGroup.splice(visited[nextCoordX][nextCoordY].nextGroup.indexOf(`${xIdx}_${yIdx}`),1);
            }else if(Math.abs(land[xIdx][yIdx] - land[nextCoordX][nextCoordY])<height+1){
                if(groups[visited[xIdx][yIdx].group].member.indexOf(visited[nextCoordX][nextCoordY].group)===-1){
                    groups[visited[xIdx][yIdx].group].member.push(visited[nextCoordX][nextCoordY].group);
                }
                visited[xIdx][yIdx].nextGroup.splice(visited[xIdx][yIdx].nextGroup.indexOf(`${nextCoordX}_${nextCoordY}`),1);
                visited[nextCoordX][nextCoordY].group = visited[xIdx][yIdx].group;
                visited[nextCoordX][nextCoordY].nextGroup.splice(visited[nextCoordX][nextCoordY].nextGroup.indexOf(`${xIdx}_${yIdx}`),1);
                grouping(nextCoordX,nextCoordY);
            }
        }
    }
    for(let i in visited){
        for(let j in visited[i]){
            if(Object.keys(groups).indexOf(visited[i][j].group) === -1){
                groups[`${i}_${j}`]={
                    member:[`${i}_${j}`]
                }
                grouping(Number(i),Number(j));
            }
        }
    }
    console.log(groups)
    const groupsKey = Object.keys(groups);
    const distanceChArr = new Array(groupsKey.length);
    for(let i in groupsKey){
        groups[groupsKey[i]].distance = new Array(groupsKey.length);
        groups[groupsKey[i]].distance[i] = 0;
    }
    for(let i in groupsKey){
        const member = [...groups[groupsKey[i]].member];
        for(let j in groupsKey){
            if(i !== j){
                let cost = 10000;
                for(let v of member){
                    const nextGroup = visited[v[0]][v[2]].nextGroup
                    for(let k in nextGroup){
                        const ladderCost = Math.abs(land[v[0]][v[2]] -land[nextGroup[k][0]][nextGroup[k][2]]);
                        if(visited[nextGroup[k][0]][nextGroup[k][2]].group===groupsKey[j] && ladderCost < cost){
                            cost = ladderCost;
                        }
                    }
                }
                groups[groupsKey[i]].distance[j] = cost;
            }
        }
    }
    const kruskal = (visitGroup) =>{
        const idx= groupsKey.indexOf(visitGroup);
        distanceChArr[idx] = true;
        let minCost = 10000;
        let minGroup = ""
        for(let i in visitChArr){
            if(!visitChArr[i] && ){
                
            }
        }
    }
    console.log(groups)
    return "not yet";
}



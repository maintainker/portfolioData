class graphData {
    constructor(n){
        this.graph=Array.from(Array(n),() => new Array(n));// 이차원 배열위해서 
    }
    addEdge(arr,type){
        if(type !== "bidirect"){
            this.graph[arr[0]][arr[1]] = [arr[2]];
            this.graph[arr[1]][arr[0]] = [arr[2]];
        }else{
            this.graph[arr[0]][arr[1]] = [arr[2]];
        } 
    }
    returnGraph(){
        return this.graph;
    }
}


class priorityQue {
    constructor(){
        this.store =[];
        this.condition = null;
    }
    setCondition(fn){
        this.condition = fn; // 비교함수 세팅
    }
    pushEdge(edge){
        if(this.store.length === 0 || this.condition === null){
            this.store.push(edge)
        }else{
            for(let i = 0 ; i < this.store.length;i++){
                const weight = this.condition(this.store[i],edge);
                if(!weight){
                    this.store.splice(i,0,edge);
                }else if(i === this.store.length-1){
                    this.store.push(edge);
                }
            }
        }
    }
    shiftEdge(){
        const edge = this.store.shift();
        return edge;
    }
}



const dfs = (a) =>{
    console.log(this)
    console.log(a)
}
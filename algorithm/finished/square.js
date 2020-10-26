
function solution(w, h) {
    const width = Number(w);
    const height = Number(h);
    const gdc = getGDC(width,height);//최대공약수 구하는 로직
    const smallW = width/gdc;
    const smallH = height/gdc;
    const exceptSquare = (smallH + smallW-1)*gdc;

    return width*height - exceptSquare;

}


const getGDC = (num1,num2)=>{
    let largeNum = 0; 
    let smallNum = 0;
    if(num1>num2){
        largeNum = num1;
        smallNum = num2;
    }else{
        largeNum = num2;
        smallNum = num1;
    }
    if(largeNum%smallNum === 0 ){
        return smallNum;
    }else{
        return getGDC(smallNum,largeNum%smallNum);
    }
}
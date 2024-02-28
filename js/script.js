let counter=0;
let matrix=initializeMatrix();

let container=document.querySelector(".container");

container.addEventListener("click",handleEvent);

function handleEvent(e){
    let elementClass=e.target.classList;
    if(!(elementClass.contains("container") || elementClass.contains("cross") || elementClass.contains("circle"))){
        handleClass(elementClass);
        if(handlePosition(elementClass)){
            return terminateGame(counter%2);
        }
        if(++counter===9){
            terminateGame(-1);
        }
    }
    else if(elementClass.contains("cross")){
        elementClass.add("shake");
        setTimeout(()=>elementClass.remove("shake"),240);
    }
    else if(elementClass.contains("circle")){
        elementClass.add("shake");
        setTimeout(()=>elementClass.remove("shake"),240);
    }
}

function handlePosition(elementClass){
    let boxName=elementClass[0];
    let boxPos=+boxName[boxName.length-1]-1;
    let x=Math.floor(boxPos/matrix.length);
    let y=boxPos%matrix.length;
    matrix[x][y]=counter%2;
    return checkWin(x,y);
}

function checkWin(x,y){
    let currVal=matrix[x][y];
    let flag=true;
    for(let row=0;row<3;row++){
        if(matrix[row][y]!==currVal){
            flag=false;
            break;
        }
    }
    if(flag)
        return true;
    flag=true;
    for(let col=0;col<3;col++){
        if(matrix[x][col]!==currVal){
            flag=false;
            break;
        }
    }
    if(flag)
        return true;
    flag=true;
    let matLastIn=matrix.length-1;
    if(x+y===matLastIn){
        for(let row=matLastIn;row>=0;row--){
            if(matrix[row][matLastIn-row]!==currVal){
                flag=false;
                break;
            }
        }
        if(flag)
            return true;
        flag=true;
    }
    if(x===y){
        for(let index=0;index<=matLastIn;index++){
            if(matrix[index][index]!==currVal)
                return false;
        }
        return true;
    }
    return false;
}
function handleClass(elementClass){
    let box=document.querySelector(`.${elementClass[0]}`);
    let child=document.createElement("div");
    box.append(child);
    giveClass(elementClass,child.classList);
}

function giveClass(elementClass,childClass){
    if(counter%2){
        elementClass.add("circle");
        childClass.add("circle-img");
    }
    else{
        elementClass.add("cross");
        childClass.add("cross-img");
    }
}
function initializeMatrix(){
    let matrix=[];
    for(let i=0;i<3;i++){
        let temp=[];
        for(let j=0;j<3;j++){
            temp.push(-1);
        }
        matrix.push(temp);
    }
    return matrix;
}
function terminateGame(input){
    let div=document.createElement("div");
    let rowPack=document.createElement("div");
    div.style.position="absolute";
    div.style.height="100vh";
    div.style.width="100vw";
    div.style.backgroundColor=input+1?"rgb(29 185 44 / 97%)":"rgb(29 150 185 / 97%)";
    div.style.gap="40px";
    let h1=document.createElement("h1");
    if(input===-1){
        h1.innerText="DRAW";
        h1.style.fontSize="8em";
        div.className="draw";
        div.style.gap="25px";
    }
    else{
        h1.innerText="WON";
        h1.style.fontSize="5em";
        div.className=input?"circle":"cross";
        let child=document.createElement("div");
        child.className=div.className+"-img";
        rowPack.append(child);
        rowPack.children[0].style.width="115px";
        child.style.height="115px";
    }
    rowPack.append(h1);
    rowPack.style.display="flex";
    rowPack.style.alignItems="center";
    rowPack.style.gap="40px";
    div.append(rowPack);
    let retry=document.createElement("div");
    retry.style.borderRadius="15px";
    retry.style.border="5px solid #d0ff71";
    retry.style.padding="5px";
    retry.style.overflow="hidden";
    retry.addEventListener("mouseover",(e)=>{
        retry.style.backgroundColor="rgba(0,0,0,0.5)";
        retry.style.cursor="pointer";
    });
    retry.addEventListener("mouseout",(e)=>{
        retry.style.backgroundColor="rgba(0,0,0,0)";
    });
    retry.addEventListener("click",(e)=>{
        let popup;
        if(input==-1)
            popup=document.querySelector("main > .draw");
        else if(input==0)
            popup=document.querySelector("main > .cross");
        else popup=document.querySelector("main > .circle");
        popup.remove();
        for(element of container.children){
            element.innerHTML="";
            element.className=element.classList[0];
        }
        counter=0;
        matrix=initializeMatrix();
    });
    let new_h1=document.createElement("h1");
    new_h1.innerText="RETRY";
    retry.append(new_h1);
    div.append(retry);
    document.querySelector("main").append(div);
}
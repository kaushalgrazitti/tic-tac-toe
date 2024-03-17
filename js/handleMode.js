export default function(){
    let triple=document.querySelector(".mode > .triple");
    let quadruple=document.querySelector(".mode > .quadruple");
    triple.addEventListener("click",e=>{
        window.open("./index.html","_self");
    });
    quadruple.addEventListener("click",e=>{
        window.open("./quadruple.html","_self");
    });
}
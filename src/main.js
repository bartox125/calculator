const outputWindow=document.getElementById("output")
const buttons=document.getElementsByClassName("bt")
const operators=['+','-','x','/']
let output=""
let toSlice=""
let result=0
let data=[]
let lastcut=0
let divide='<i class="fa-solid fa-divide"></i>'

for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", ()=>{
        add(buttons[i].textContent)
    })
}

const add=(input)=>{
    console.log(input);
    if(input=='/'){
        output+=" "
        output+=divide
        toSlice+="/"
    }
    else{
        output+=input
        toSlice+=input
    }
    outputWindow.innerHTML=output
}
const execute=()=>{
    let wynik
    console.log(output);
    // console.log(typeof(output));
    // console.log(toSlice);
    //pętla "tnie stringa i wstawia elementy do tablicy"
    for(let i=0;i<toSlice.length;i++){
        if(operators.includes(toSlice[i])){
            data.push(parseFloat(toSlice.slice(lastcut,i)))
            data.push(toSlice[i])
            lastcut=i+1
        }
        else if(i==toSlice.length-1){
            data.push(parseFloat(toSlice.slice(lastcut,i+1)))
            lastcut=i+1
        }
        console.log(data);
    }
    calculate()
    //outputWindow.innerText=wynik
}
const deleteAll=()=>{
    output=""
    result=0
    data=[]
    toSlice=""
    lastcut=0
    outputWindow.innerHTML=output
}
const del=()=>{
    output=output.slice(0,-1)
    toSlice=toSlice.slice(0,-1)
    outputWindow.innerHTML=output
}
const calculate=()=>{
    console.log(data);
    //pętla odpowiedzialna za mnożenie i dzielenie
    for(let i=0;i<data.length;i++){
        console.log("i równe", i);
        console.log(data.length);
        let x
        if(data[i]=="x"){
            x=data[i-1]*data[i+1]
        }
        else if(data[i]=="/"){
            x=data[i-1]/data[i+1]
        }
        if(x){
            changeArray(x,i)
        }
    }
    //pętla odpowiedzialna za dodawanie i odejmowanie
    for(let i=0;i<data.length;i++){
        let x
        if(data[i]=="+"){
            x=data[i-1]+data[i+1]
        }
        else if(data[i]=="-"){
            x=data[i-1]-data[i+1]
        }
        if(x){
           changeArray(x,i)
        }
    }
    //console.log(newArr);
}
const changeArray=(x,i)=>{
    console.log("x",x);
    let first=data.slice(0,i-1)
    console.log("first",first);
    let second=data.slice(i+2,data.length)
    i=0
    console.log("second", second);
    data=first
    console.log(data);
    data.push(x)
    console.log(data);
    data=data.concat(second)
    console.log(data);
}
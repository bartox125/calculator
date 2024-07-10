const outputWindow=document.getElementById("output")
const buttons=document.getElementsByClassName("bt")
const operators=['+','-','x','/']
const notAllowed=['+','x','/',')','%','^','!']
let divide='<i class="fa-solid fa-divide"></i>'
let toSlice=""
let end=false

for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click", ()=>{
        add(buttons[i].textContent)
    })
}

const add=(input)=>{
    if(end==true && (notAllowed.includes(input)==false && input!="(" && input!=".")){
        toSlice=input
        end=false
    }
    else{
        if(end){
            end=false
        }
        if((notAllowed.includes(input)==false && toSlice.length==0) || toSlice.length>0){
            console.log(toSlice[toSlice.length-1]);
            if(operators.includes(toSlice[toSlice.length-1]) && operators.includes(input)){
                toSlice.slice(0,-1)
                toSlice+=input
            }
            else{
                toSlice+=input
            }
        }
    }
    outputWindow.innerHTML=createStr()
}
const findBracket=(string)=>{
    let newString=toSlice.slice(0,toSlice.indexOf(")"))
    let bracket=newString.slice(newString.lastIndexOf("(")+1,newString.length)
    return {
        start:newString.lastIndexOf("(")+1, 
        end:toSlice.indexOf(")"), 
        str:bracket
        }
}

const execute=()=>{
    if(toSlice.includes("(")){
        let obj=findBracket(toSlice)
        let calculatedBracket=calculate(obj.str)
        let part1=toSlice.slice(0,obj.start-1)
        let part2=toSlice.slice(obj.end+1,toSlice.length)
        if(operators.includes(toSlice[obj.start-2])){
            toSlice=part1+calculatedBracket
            if(operators.includes(part1[part1.length-1])){
                toSlice+=part2
            }
            else if(obj.end==toSlice.length-1){
                toSlice+="x"
                toSlice+=part2
            }
        }
        else{
            toSlice=part1+"x"+calculatedBracket
            if(operators.includes(part1[part1.length-1])){
                toSlice+=part2
            }
            else if(obj.end==toSlice.length-1){
                toSlice+="x"
                toSlice+=part2
            }
        }
        execute()
    }
    else{
        let result=calculate(toSlice)
        outputWindow.innerHTML=result
        toSlice=result[0]
        toSlice=String(toSlice)
        end=true
    }
}
const calculate=(bracket)=>{
    let lastcut=0
    let tab=[]
    let firstNegative=false
    //cięcie stringa i utworzenie tablicy
    for(let i=0;i<bracket.length;i++){
        if(i==0 && bracket[i]=='-'){
            tab.push(bracket.slice(0,2))
            i++
            lastcut+2
            firstNegative=true
        }
        else if(operators.includes(bracket[i])){
            if(firstNegative){
                tab.push(bracket[i])
                lastcut=i+1
            }
            else{
                tab.push(bracket.slice(lastcut,i))
                tab.push(bracket[i])
                lastcut=i+1
            }
        }
        else if(i==bracket.length-1){
            tab.push(bracket.slice(lastcut,i+1))
            lastcut=i+1
        }
    }
    for(let x=0;x<tab.length;x+=2){
        //silnia
        if(tab[x].includes("!")){
            tab[x]=strong(parseInt(tab[x]))
        }
        //potegowanie
        else if(tab[x].includes("^")){
            let base=parseFloat(tab[x].slice(0,tab[x].indexOf("^")))
            let exponent=parseFloat(tab[x].slice(tab[x].indexOf("^")+1,tab[x].length))
            tab[x]=base**exponent
        }
        //pierwiastkowanie
        else if(tab[x].includes("#")){
            tab[x]=Math.sqrt(parseFloat(tab[x].slice(1,tab[x].length)))
        }
        //procenty
        else if(tab[x].includes("%")){
            let procent=parseFloat(tab[x].slice(0,tab[x].indexOf("%")))
            let number=parseFloat(tab[x].slice(tab[x].indexOf("%")+1, tab[x].length))
            tab[x]=(procent/100)*number
        }
        //pętla odpowiedzialna za mnozenie 
        for(let i=0;i<tab.length;i++){
            let x
            if(tab[i]=="x"){
                x=tab[i-1]*tab[i+1]
            }
            else if(tab[i]=="/"){
                x=tab[i-1]/tab[i+1]
            }
            if(x){
                let first=tab.slice(0,i-1)
                let second=tab.slice(i+2,tab.length)
                i=0
                tab=first
                tab.push(x)
                tab=tab.concat(second)
            }
        }
        //pętla odpowiedzialna za dodawanie i odejmowanie
        for(let i=0;i<tab.length;i++){
            let x
            if(tab[i]=="+"){
                x=parseFloat(tab[i-1])+parseFloat(tab[i+1])
            }
            else if(tab[i]=="-"){
                x=parseFloat(tab[i-1])-parseFloat(tab[i+1])
            }
            if(x){
                let first=tab.slice(0,i-1)
                let second=tab.slice(i+2,tab.length)
                i=0
                tab=first
                tab.push(x)
                tab=tab.concat(second)
            }
        }   
    }
    return tab
}
const strong=(int)=>{
    let result=1
    if(int==0 || int==1){
        return result
    }
    else{
        for(let i=1;i<int+1;i++){
            result=result*i
        }
        return result
    }
}
const deleteAll=()=>{
    toSlice=""
    outputWindow.innerHTML=""
}
const del=()=>{
    if(toSlice.length>0){
        toSlice=toSlice.slice(0,-1)
        outputWindow.innerHTML=createStr()
    }
}
const createStr=()=>{
    let output=""
    for(let i=0;i<toSlice.length;i++){
        if(toSlice[i]=="/"){
            output+=divide
        }
        else if(toSlice[i]=="#"){
            output+="&radic;"
        }
        else{
            output+=toSlice[i]
        }
    }
    return output
}

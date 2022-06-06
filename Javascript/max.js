const sub = document.querySelector("form")
const rep = document.querySelector(".rep")
const weight = document.querySelector(".weight")
const exc = document.getElementById("chooseexcer")
const drop = document.querySelector("#dropdown")
const row = document.querySelectorAll(".row")

console.log(row)
const excVal = {
"Bench Press": 40,   
"Squat":30,
"Deadlift":30,
"Shoulder Press":40, 
"Bicep Curls":50,
"Romanian Deadlift":30,
"Tricep Pushdown":30,
"Close Grip Bench Press":30,
"Hex Bar Deadlift":30,
}
//Start with full list
//When letter type filter through list
//Remove elements that don't match begining of type in word
row.forEach(item => {
    item.addEventListener('pointerdown', e => {
        console.log("e")
    })  
  })

sub.addEventListener("submit", (e)=>{
    e.preventDefault()
    const max = Math.floor(weight.value*(1+rep.value/30))
    document.querySelector("#max h1").textContent=max
    //document.querySelector("#max h1").remove(Text)

})

//
exc.addEventListener("input",(e)=>{
const menu = document.getElementById("excerLayout")
if (e.target.value.length===0) {
    menu.style.opacity=0 
}
else {
    menu.style.opacity=.8;
}
let count = 0;
for (let val in excVal) {
    //Redo this bar
    if(val.slice(0,e.target.value.length).toLowerCase().trim()===e.target.value.toLowerCase().trim()) {
        console.log(row)
        count++
        for (let i=0;i<count;i++){
            const newEle = document.createElement("div")
            const textNode= document.createTextNode(val)
            newEle.appendChild(textNode)
            newEle.className = "row"
            menu.append(newEle)
        }
        for(let i of document.getElementsByClassName("row")){
            i.remove()
        }
        
    }        
}
})

//Data object contains specific constants on each lift
import data from "../JSON/user-lifts.json" assert {type:'json'};
//Dom Elements
const submit = document.querySelector("form")
const deadlift = document.getElementById("deadlift")
const squat = document.getElementById("squat")
const bench = document.getElementById("bench")
const height = document.getElementById("height")
const weightNode = document.getElementById("weight")
const ffmi = document.getElementById("ffmi")
const genderNode = document.getElementById("dropdownSex")

const startMax = document.querySelectorAll("#startMax label input")

const lbtokg = 0.45359237
//Object store values related to user's lift
let userObj = submit.addEventListener("submit",(e)=>{
    e.preventDefault()
    const lifts={
    max: {
        deadlift:parseInt(deadlift.value)* lbtokg,
        squat:parseInt(squat.value)* lbtokg,
        bench:parseInt(bench.value)* lbtokg,
        max:[]
        },
    startMax: {
        deadlift:parseInt(startMax[0].value)*lbtokg,
        squat:parseInt(startMax[1].value)*lbtokg,
        bench:parseInt(startMax[2].value)*lbtokg,
        max:[]
        },
    progMax: {
        deadlift:0,
        squat:0,
        bench:0,
        max:[]
        }
    }

//Adds max to object
    lifts.max.max.push((()=> {
        let count=0
        for (let lift in lifts.max){
            count+=lifts.max[lift]
        }
        return parseFloat(count)
    })())
console.log(lifts)
const max = lifts.max.max[0]
//Adds % of max to each lift
    for (let lift in lifts.max) {
        lifts.max.max.push(lifts.max[lift]/max)
    }
//Adds % of starting max to each lift
    for (let lift in startMax.max) {
        lifts.startMax.max.push(lifts.startMax[lift]/max)
    }
//Difference between maybe use filter on all values? Using recursion to progress?
    
//Calculates Wilkes Score  
const gender = genderNode.value
const weight = parseInt(weightNode.value) * lbtokg
 lifts.max.max.push(wilksScore(weight,max,gender))
function wilksScore(bodyWeight, totalWeightLifted, gender) {
    let a,b,c,d,e,f;
    let coefficientDenom;
    let coefficient; 
    let totalWilks;
    
    if (gender === "0") {
        a = 47.46178854;
        b = 8.472061379;
        c = .07369410346;
        d = -0.001395833811;
        e = 7.07665973070743 * (Math.pow(10, -6));
        f = -1.20804336482315 * (Math.pow(10, -8));

        coefficientDenom = (a + 
            (b * bodyWeight) + 
            c * Math.pow(bodyWeight, 2) + 
            d * Math.pow(bodyWeight, 3) + 
            e * Math.pow(bodyWeight, 4) + 
            f * Math.pow(bodyWeight, 5));
    } else {
        a = -125.4255398;
        b = 13.71219419;
        c = -0.03307250631;
        d = -0.001050400051;
        e = 9.38773881462799 * (Math.pow(10, -5));
        f = -2.3334613884954 * (Math.pow(10, -8));

        coefficientDenom = (a + 
            (b * bodyWeight) + 
            c * Math.pow(bodyWeight, 2) + 
            d * Math.pow(bodyWeight, 3) + 
            e * Math.pow(bodyWeight, 4) + 
            f * Math.pow(bodyWeight, 5));
    }

    coefficient = 600 / coefficientDenom;

    totalWilks = (totalWeightLifted * coefficient).toFixed(2);
    return totalWilks;
    }
    return lifts
})

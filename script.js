let selected = new Array(75).fill(false);
let numSelected = 0;
let testArray = new Array(75).fill(0);
let fullReset = true;
let noRepeats = true;
let noSkips = true;
let singleTesting = false;
let multipleTesting = false;
let totalRuns = 0;
let runsResetProperly = 0;
let runsWithoutRepeats = 0;
let runsWithRepeats = 0;
let runsWithoutSkips = 0;
let runsWithSkips = 0;
let bArray = new Array(0);
let iArray = new Array(0);
let nArray = new Array(0);
let gArray = new Array(0);
let oArray = new Array(0);

//keeps calling the numbers
let repeat;

gameStyle.addEventListener('change', () => {
    let value = document.getElementById('gameStyle').value;
    if(value === "rows"){
        document.getElementById('bingoImages').src= "bingoImages/row.png";
        
    } else if(value === "4 corners"){
        document.getElementById('bingoImages').src= "bingoImages/fourCorners.png";
        
    } else if(value === "blackout"){
        document.getElementById('bingoImages').src= "bingoImages/blackout.png";
        
    } else if(value === "H"){
        document.getElementById('bingoImages').src= "bingoImages/h.png";
        
    } else if(value === "X"){
        document.getElementById('bingoImages').src= "bingoImages/x.png";
        
    } else if (value === "Z") {
    } else if (value === "C") {
        document.getElementById('bingoImages').src= "bingoImages/c.png";
    } else if (value === "S") {
        document.getElementById('bingoImages').src= "bingoImages/s.png";
    } else if (value === "outline") {
        document.getElementById('bingoImages').src= "bingoImages/outline.png";
    } else if (value === "diamond") {
        document.getElementById('bingoImages').src= "bingoImages/diamond.png";
    } else if (value === "I") {
        document.getElementById('bingoImages').src= "bingoImages/i.png";
    }
});


//when the user wants to show the controls they appear
controlButton.addEventListener('click', () => {
   if (controlButton.textContent == "Show controls") {
       //show the controls
       controls.style.display = 'block';
       controlButton.textContent = "Hide controls";
       document.getElementById("bingoImages").style.left = "65vw";
   } else {
       controls.style.display = 'none';
       controlButton.textContent = "Show controls";
       document.getElementById("bingoImages").style.left = "80vw";
   }
});

//when new round is clicked all the selected numbers get unclicked
document.getElementById('newRoundButton').addEventListener('click',newRound);
function newRound() {
    clearInterval(repeat);
    document.getElementById('startButton').innerHTML = "Start"; 

    selected.fill(false);
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => {circle.style.backgroundColor = "#82abfd"});
    
    const mainCircleContainer = document.getElementById("main-circle");
    mainCircleContainer.innerHTML = '';
    
    for(let i = 0; i < selected.length; i++){
        if(selected[i] == true){
            fullReset = false;
        }
    }
}

//when the time interval is changed, change the time
document.getElementById('mySlider').addEventListener('change', sliderChangeValue);

//start the game
document.getElementById('startButton').addEventListener('click',beginButton);

function beginButton() {
    let button = document.getElementById('startButton');
    if (button.textContent == "Start") {
        startButton();
        button.innerHTML = "Pause"; 
    } else {
        pauseButton();
        button.innerHTML = "Start"; 
    }
}

function startButton() {
    //start the interval

    clearInterval(repeat);
    let time = document.getElementById("mySlider").value * 1000;
    
    repeat = setInterval(chooseValue, (time));
    //document.getElementById('startButton').innerHTML = "Pause";
    
    
    if (singleTesting || multipleTesting) repeat = setInterval(chooseValue, 0.1);
    
}


function sliderChangeValue() {
    if (document.getElementById('startButton').textContent == "Pause") {
        //currently running
        clearInterval(repeat);
        let time = document.getElementById("mySlider").value * 1000;
        
        repeat = setInterval(chooseValue, (time));
    }
    
}


//pause the game
//document.getElementById('pauseButton').addEventListener('click',pauseButton);
function pauseButton() {
    //pause the interval
    clearInterval(repeat);
    
}


document.getElementById('winnerButton').addEventListener("click", (e) => {
    let song = new Audio("https://codehs.com/uploads/53353ab490d1a999c838d37f34934fc3");
    song.play();
    confetti({
        
        particleCount:500,
        spread:window.innerWidth,
        //startVelocity: 25,
        origin: {
            x: 0,
            y: 0
            //x: e.clientX / window.innerWidth,
            //y: e.clientY / window.innerHeight
            
        }
    })
})

document.getElementById('winnerButton').addEventListener("click", (e) => {
    confetti({
        particleCount:1000,
        spread:window.innerWidth,
        //startVelocity: 25,
        origin: {
            x: e.clientX / window.innerWidth,
            y: 0
            //x: e.clientX / window.innerWidth,
            //y: e.clientY / window.innerHeight
            
        }
    })
})


//function to choose the numbers
function chooseValue() {
    let randomValue = Math.floor(Math.random() * 75)+1;
    let num = " ";
    let letter = " ";
    if (randomValue <= 15) {
        //console.log("B" + randomValue);
        letter = "B"
        num = randomValue;
    } else if (randomValue <= 30) {
        //console.log("I" + randomValue);
        letter = "I"
        num = randomValue;
    } else if (randomValue <= 45) {
        //console.log("N" + randomValue);
        letter = "N"
        num = randomValue;
    } else if (randomValue <= 60) {
        letter = "G"
        num = randomValue;
    } else if (randomValue <= 75) {
        //console.log("O" + randomValue);
        letter = "O"
        num = randomValue;
    }
    let realWord = letter + randomValue;
    
    addCalledNumber(randomValue, realWord);
    addCircle(randomValue, letter, num, realWord);
    
    let song = new Audio("https://codehs.com/uploads/63b3302e3d5dd19596c4d829c165a7c2");

    // Play the song
    song.play();
    //song.loop = true;

    
    //stop printing numbers after all are chosen
    if (numSelected==75) {
        clearInterval(repeat);
        
        if (singleTesting){
          checkIfSelected();
          addLetter(bArray, "B");
          addLetter(iArray, "I");
          addLetter(nArray, "N");
          addLetter(gArray, "G");
          addLetter(oArray, "O");
        }
        
        
    }
}

function tester(numGames) {
    selected.fill(false);
    numSelected = 0;
    bArray = [];
    iArray = [];
    nArray = [];
    gArray = [];
    oArray = [];
    totalRuns = 0;
    runsResetProperly = 0;
    runsWithoutRepeats = 0;
    runsWithRepeats = 0;
    runsWithoutSkips = 0;
    runsWithSkips = 0;
    
    for(let i = 0; i < numGames; i++){
         newRound();
         while(numSelected < 75){
             chooseValue();
         }
         checkRepeat();
    }
    
    console.log("Total Runs: " + totalRuns);
    console.log("Runs reset properly: " + runsResetProperly);
    console.log("Runs without repeats: " + runsWithoutRepeats);
    console.log("Runs with repeats: " + runsWithRepeats);
    console.log("Runs without skips: " + runsWithoutSkips);
    console.log("Runs with skips: " + runsWithSkips);
}

if(multipleTesting) tester(10000);

function checkRepeat(){
    totalRuns++;

    if (fullReset) runsResetProperly++;
    if (noRepeats) runsWithoutRepeats++;
    else runsWithRepeats++;

    if (noSkips) runsWithoutSkips++;
    else runsWithSkips++;
}

function addLetter(arr, letter){
    let output = arr.map(num => letter + num);
    console.log(letter + " Array:", output);
}

function addCalledNumber(randomValue, num){
    if(selected[randomValue-1] == false){
        let letter = num.substring(0,1);
        if(letter === "B"){
            bArray.push(randomValue);
        } else if(letter === "I"){
            iArray.push(randomValue);
        } else if(letter === "N"){
            nArray.push(randomValue);
        } else if(letter === "G"){
            gArray.push(randomValue);
        } else {
            oArray.push(randomValue);
        }
    }
    
    bArray.sort((a, b) => a - b);
    iArray.sort((a, b) => a - b);
    nArray.sort((a, b) => a - b);
    gArray.sort((a, b) => a - b);
    oArray.sort((a, b) => a - b);
}

function addCircle(randomValue, updatedLetter, num, letter) {

    if (selected[randomValue-1] == false) {
        //now it is selected
        
        if (!multipleTesting) document.getElementById(`circle-${randomValue}`).style.backgroundColor = "#db0909";
        selected[randomValue-1] = true;
        numSelected++;
        testArray[randomValue+1] = randomValue;
        //console.log(testArray[randomValue+1]);
        
        
        // Create big circle with number
        const newBigCircle = document.createElement('div');
        newBigCircle.classList.add('big-circle');
        newBigCircle.textContent = updatedLetter + "\n" + num;

        // Add it to the box
        const mainCircleContainer = document.getElementById("main-circle");
        mainCircleContainer.appendChild(newBigCircle);

        const allCircles = document.querySelectorAll('.big-circle');
        const numCircles = allCircles.length;

        // Loop through each circle and position it
        allCircles.forEach((circle, index) => {
        
            // If it's the most recent circle, keep it centered
            if (index === numCircles - 1) {
                circle.style.position = "absolute";
                circle.style.left = "50%";
                circle.style.transform = 'translateX(-50%)';
                circle.style.margin = "auto"; 
                //circle.style.animation = "shiftLeft 0.5s ease-in-out";
            } else {
                // Move older circles to the left
                circle.style.position = "absolute";
                let currentLeft = parseFloat(circle.style.left) || 50; 
                let newLeft = currentLeft - 15;
                circle.style.left = `${newLeft}%`;
                circle.style.transform = 'translateX(-50%)';
                circle.style.width = "3%";
                circle.style.height = "30%"
                circle.style.opacity = "0.7";
                circle.style.fontSize = "500%"
                circle.style.animation = "shiftLeft 1s ease-in-out";
                
            }
        });

        let maxCircles = 4;
        // Remove the oldest circle after four circles
        if (numCircles > maxCircles) {
            const firstCircle = allCircles[0];
            firstCircle.remove();
        }
        
        
    }
}

//testing if all numbers were selected
function checkIfSelected() {
    console.log("Output - Single Run");
    for(let i = 0; i < testArray.length; i++){
        if(testArray[i] != (i-1) && i != 0){
            noRepeats = false;
            noSkips = false;
        }
        
    }
    
    console.log(fullReset + " - full resets");
    console.log(noRepeats + " - no repeats");
    console.log(noSkips + " no skips");
    
}


//creating the text
const circleContainer = document.getElementById("circle-container");

for(let i = 1; i <= 75; i++){
        const circle = document.createElement('div');
        circle.classList.add("circle");
        circle.id = `circle-${i}`;
        
        if (i <=15) {
            circle.textContent = "B\n" + i;
        } else if (i <= 30) {
            circle.textContent = "I\n" + i;
        } else if (i <= 45) {
            circle.textContent = "N\n" + i;
        } else if (i <= 60) {
            circle.textContent = "G\n" + i;
        } else if (i <= 75) {
            circle.textContent = "O\n" + i;
        }
        
        circleContainer.appendChild(circle);
}

//chaning the value
var slider = document.getElementById("mySlider");
var output = document.getElementById("myPara");
output.textContent = slider.value;

slider.oninput = function() {
  output.textContent = this.value;
}
document.addEventListener("keydown", setStepWithKeys);
document.addEventListener("keydown", setStepWithTouches);

let easyButton = document.querySelector("#easy");
let mediumButton = document.querySelector("#medium");
let hardButton = document.querySelector("#hard");
let buttons = [easyButton, mediumButton, hardButton];

easyButton.addEventListener("click", e => buttonClick(e));
mediumButton.addEventListener("click", e => buttonClick(e));
hardButton.addEventListener("click", e => buttonClick(e));

document.querySelector("#restart").addEventListener("click", () => {
    location.reload();
});

let canvas = document.getElementById('can');
let ctx = canvas.getContext("2d");
ctx.fillStyle = "lime";

let headXPos = 0;
let headYPos = 0;
let XDirection = 0;
let YDirection = 1;
let gridSize = 20;
let tileCount = 20;
let goalXPos = 0;
let goalYPos = 0;
let score = 0;
let interval = null;

let trail = [];
let tail = 5;

createGoal();

function game(){
    headYPos += YDirection;
    headXPos += XDirection;

    checkBorderCollide();
    for(let i = 0; i < trail.length; i++){
        ctx.fillStyle = "lime";
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

        if(trail[i].x === headXPos && trail[i].y === headYPos){
            tail = 5;
            score = 0;
            setScore();
        }
    }

    trail.push({x:headXPos, y:headYPos});
    while(trail.length > tail){
        ctx.clearRect(trail[0].x * gridSize, trail[0].y * gridSize, gridSize - 2, gridSize - 2);
        trail.shift();
    }

    if(trail.length >= 5){
        if(trail[4].x === goalXPos && trail[4].y === goalYPos){
            trail.push({x:headXPos, y:headYPos});
            tail++;
            score++;
            setScore();
            createGoal();
        }
    }
}

function createGoal(){
    ctx.fillStyle = "#ff0000";
    goalXPos = Math.floor(Math.random() * tileCount);
    goalYPos = Math.floor(Math.random() * tileCount);

    for(let i = 0; i < trail.length; i++){
        if(trail[i].x === goalXPos && trail[i].y === goalYPos){
            goalXPos = Math.floor(Math.random() * tileCount);
            goalYPos = Math.floor(Math.random() * tileCount);
        }
    }

    ctx.fillRect(goalXPos * gridSize, goalYPos * gridSize, gridSize - 2, gridSize - 2);
}

function setStepWithKeys(e) {
    switch (e.key){
        case "ArrowUp":
            if(YDirection !== 1){
                YDirection = -1;
                XDirection = 0;
            }
            break;
        case "ArrowDown":
            if(YDirection !== -1){
                YDirection = 1;
                XDirection = 0;
            }
            break;
        case "ArrowRight":
            if(XDirection !== -1){
                YDirection = 0;
                XDirection = 1;
            }
            break;
        case "ArrowLeft":
            if(XDirection !== 1){
                YDirection = 0;
                XDirection = -1;
            }
            break;
    }
}

function setStepWithTouches(e){
    console.log(e.pageX + " " + e.pageY);
    if(e.pageX > 22 && e.pageX < 55 && e.pageY > 22 && e.pageY < 55){
        //Up
        if(YDirection !== 1){
            YDirection = -1;
            XDirection = 0;
        }
    } else if(e.pageX > 22 && e.pageX < 55 && e.pageY > 22 && e.pageY < 55){
        //Down
        if(YDirection !== -1){
            YDirection = 1;
            XDirection = 0;
        }
    } else if (e.pageX > 22 && e.pageX < 55 && e.pageY > 22 && e.pageY < 55){
        //Right
        if(XDirection !== -1){
            YDirection = 0;
            XDirection = 1;
        }
    } else if (e.pageX > 22 && e.pageX < 55 && e.pageY > 22 && e.pageY < 55){
        //Left
        if(XDirection !== 1){
            YDirection = 0;
            XDirection = -1;
        }
    }
}

function checkBorderCollide() {
    if(headYPos > 19){
        headYPos = 0;
    }
    if(headXPos > 19){
        headXPos = 0;
    }
    if(headXPos < 0){
        headXPos = 19;
    }
    if(headYPos < 0){
        headYPos = 19;
    }
}

function setScore(){
    let scoreDiv = document.querySelector("#score label");
    scoreDiv.innerHTML = score.toString();
}

function buttonClick(e){
    switch (e.target){
        case easyButton:
            setInterval(game, 1000/10);
            break;
        case mediumButton:
            setInterval(game, 1000/15);
            break;
        case hardButton:
            setInterval(game, 1000/20);
            break;
    }
    e.target.style.background = "lightgray"

    let counter = 0;
    while (counter < buttons.length){
        document.querySelector("#"+ buttons[counter].id).style.background = "#FCFCFC";
        document.querySelector("#"+ buttons[counter].id).disabled = true;
        counter++;
    }
}
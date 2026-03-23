gameRunning = true
//Cameras
let camerasActive = true
//Battery
let battery = 99
const batteryText = document.getElementById("batteryText")
let extraAppliances = 0
//Terminal
const terminal = document.getElementById("terminalScreen")
let terminalActive = false
//Rooms
const room1 = document.getElementById("room1")
const room2 = document.getElementById("room2")
const room3 = document.getElementById("room3")
const room4 = document.getElementById("room4")
const room5 = document.getElementById("room5")
const room6 = document.getElementById("room6")
const room7 = document.getElementById("room7")
const room8 = document.getElementById("room8")
const room9 = document.getElementById("room9") 
//Entity
const entity = document.getElementById("entity")
let prevRoom = "room1" //1 and 7 cannot have prevRoom logic since they are by the door and should always rush
let entityLocation = "room1"
//Doors
const topDoor = document.getElementById("topDoor")
let topDoorClosed = false
topDoor.style.display = "none"
const sideDoor = document.getElementById("sideDoor")
let sideDoorClosed = false
sideDoor.style.display = "none"
const bottomDoor = document.getElementById("bottomDoor")
let bottomDoorClosed = false
bottomDoor.style.display = "none"



let holdInterval = null;
let dotCount = 0;
let fullText = "";

function showError(text){
    fullText = `Error: ${text}`;
    dotCount = 0;
    terminal.firstElementChild.textContent = fullText;
}

// Add dots while holding
terminal.firstElementChild.addEventListener("mousedown", () => {
    if (holdInterval) return; // prevent multiple intervals
    dotCount = 0;
    holdInterval = setInterval(() => {
        dotCount++;
        terminal.firstElementChild.textContent = fullText + ".".repeat(dotCount);
        if (dotCount >= 3) {          // after 3 dots
            clearInterval(holdInterval);
            holdInterval = null;
            terminal.firstElementChild.textContent = "";
            hideTerminal();           // hide terminal safely
            showCameras();            // restore cameras
        }
    }, 500);
});

// Stop adding dots if released early
terminal.firstElementChild.addEventListener("mouseup", () => {
    if (holdInterval){
        clearInterval(holdInterval);
        holdInterval = null;
    }
});
terminal.firstElementChild.addEventListener("mouseleave", () => {
    if (holdInterval){
        clearInterval(holdInterval);
        holdInterval = null;
    }
});
document.addEventListener("keydown", event =>{
    if (gameRunning){
        event.preventDefault()
        if (event.key == " "){
            if (terminalActive){
                hideTerminal()
            }
            else{
                showTerminal()
            }
        }
        if (event.key == "w"){
            if (topDoorClosed){
                topDoorClosed = false
                topDoor.style.display = "none"
                extraAppliances--
            }
            else{
                topDoorClosed = true
                topDoor.style.display = "block"
                extraAppliances++
            }
        }
        if (event.key == "a" || event.key == "d"){
            if (sideDoorClosed){
                sideDoorClosed = false
                sideDoor.style.display = "none"
                extraAppliances--
            }
            else{
                sideDoorClosed = true
                sideDoor.style.display = "block"
                extraAppliances++
            }
        }
        if (event.key == "s"){
            if (bottomDoorClosed){
                bottomDoorClosed = false
                bottomDoor.style.display = "none"
                extraAppliances--
            }
            else{
                bottomDoorClosed = true
                bottomDoor.style.display = "block"
                extraAppliances++
            }
        }
    }

})
function hideCameras(){
    if (gameRunning){
        terminal.firstElementChild.textContent = "Error: Cameras"
        camerasActive = false
        showError("Camera")
        const rooms = document.querySelectorAll(".room")
        rooms.forEach(room => {
            room.classList.add("hiddenroom")
            room.classList.remove("room")
        entity.style.display = "none"
        })
    }
}
function hideCamera(room){
    if (gameRunning){
        room.classList.add("hiddenroom")
        room.classList.remove("room")
    }
}
function showCamera(room){
    terminal.firstElementChild.textContent
    if (gameRunning){
        room.classList.add("room")
        room.classList.remove("hiddenroom")
    }
}
function showCameras(){
    if (gameRunning){
        camerasActive = true
        const rooms = document.querySelectorAll(".hiddenroom")
        rooms.forEach(room => {
            room.classList.add("room")
            room.classList.remove("hiddenroom")
        entity.style.display = "block"
        })
    }
}
function updateBattery(){
    if (battery >0){
        battery-= Math.ceil(extraAppliances/2)
        batteryText.textContent = `Battery: ${battery}%`
    }
    else if (battery === 0){
        endGame()
    }
}
function showTerminal(){
    if (gameRunning){
        terminalActive = true
        terminal.classList.add("terminal")
        terminal.style.display = "block"
        terminal.firstElementChild.style.display = "block"
    }
}
function hideTerminal(){
    if (gameRunning){
        terminalActive = false
        terminal.classList.remove("terminal")
        terminal.style.display = "none"
        terminal.firstElementChild.style.display = "none"
    }
}
hideTerminal()
function goToRoom(room){
    switch(room){
        case "room1":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room1")
            entityLocation = "room1"
            break
        case "room2":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room2")
            entityLocation = "room2"
            break
        case "room3":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room3")
            entityLocation = "room3"
            break
        case "room4":
            endGame()
            break
        case "room5":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room5")
            entityLocation = "room5"
            break
        case "room6":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room6")
            entityLocation = "room6"
            break
        case "room7":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room7")
            entityLocation = "room7"
            break
        case "room8":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room8")
            entityLocation = "room8"
            break
        case "room9":
            entity.classList.remove(entityLocation)
            prevRoom = entityLocation
            entity.classList.add("room9")
            entityLocation = "room9"
            break
    }
}
function endGame(){
    terminal.firstElementChild.textContent = "The game ended"
    showTerminal()
    gameRunning = false
    console.log("Ended Game")
    entity.style.display = "none"
    topDoorClosed = false
    topDoor.style.display = "none"
    sideDoorClosed = false
    sideDoor.style.display = "none"
    bottomDoorClosed = false
    bottomDoor.style.display = "none"
    extraAppliances = 0
    battery = 0
    batteryText.textContent = `Battery: ${battery}%`
    showCameras()
}
function chooseRoom() {
    let randomnum; // declare once at the top

    switch(entityLocation) {
        case "room1":
            if(topDoorClosed){
                randomnum = Math.ceil(Math.random() * 3) * 3;
                console.log(`room${randomnum}`);
                return `room${randomnum}`; // random back room 3, 6, 9
            }
            console.log("room4");
            return "room4";

        case "room2":
            if(prevRoom === "room3"){
                if(topDoorClosed && !sideDoorClosed){
                    if(Math.ceil(Math.random() * 4) === 1){ // prioritize side door
                        console.log("room1");
                        return "room1";
                    }
                    console.log("room5");
                    return "room5";
                } else if(!topDoorClosed && sideDoorClosed){
                    if(Math.ceil(Math.random() * 4) === 1){ // prioritize top door
                        console.log("room5");
                        return "room5";
                    }
                    console.log("room1");
                    return "room1";
                }
                if(Math.ceil(Math.random() * 5) === 1){
                    console.log("room3");
                    return "room3";
                }
                if(Math.ceil(Math.random() * 2) === 1){
                    console.log("room5");
                    return "room5";
                }
                console.log("room1");
                return "room1";
            } else if(prevRoom === "room5"){
                if(Math.ceil(Math.random() * 4) === 1){
                    console.log("room3");
                    return "room3";
                }
                console.log("room1");
                return "room1";
            }
            if(Math.ceil(Math.random() * 4) === 1){
                console.log("room3");
                return "room3";
            }
            console.log("room5");
            return "room5";

        case "room3":
            if(prevRoom === "room6"){
                if(Math.ceil(Math.random() * 5) === 1){
                    console.log("room6");
                    return "room6";
                }
                console.log("room2");
                return "room2";
            }
            if(Math.ceil(Math.random() * 2) === 1){
                console.log("room6");
                return "room6";
            }
            console.log("room2");
            return "room2";

        case "room5":
            randomnum = Math.ceil(Math.random() * 8);
            if(prevRoom === "room6" || prevRoom === "room2" || prevRoom === "room9"){
                if(randomnum >= 1 && randomnum <= 3){
                    console.log("room2");
                    return "room2";
                } else if(randomnum >= 4 && randomnum <= 6){
                    if(sideDoorClosed){
                        randomnum = Math.ceil(Math.random() * 3) * 3;
                        console.log(`room${randomnum}`);
                        return `room${randomnum}`;
                    }
                    console.log("room4");
                    return "room4";
                } else if(randomnum === 7){
                    console.log("room9");
                    return "room9";
                }
                console.log("room6");
                return "room6";
            }
            if(sideDoorClosed){
                randomnum = Math.ceil(Math.random() * 3) * 3;
                console.log(`room${randomnum}`);
                return `room${randomnum}`;
            }
            console.log("room4");
            return "room4";

        case "room6":
            randomnum = Math.ceil(Math.random() * 6);
            if(prevRoom === "room3"){
                if(randomnum === 1) return "room3";
                else if(randomnum === 2 || randomnum === 3) return "room9";
                return "room5";
            } else if(prevRoom === "room9"){
                if(randomnum === 1) return "room9";
                else if(randomnum === 2 || randomnum === 3) return "room3";
                return "room5";
            } else if(prevRoom === "room5"){
                if(randomnum === 1 || randomnum === 2) return "room9";
                else if(randomnum === 3 || randomnum === 4) return "room3";
                return "room5";
            }
            return "room5";

        case "room7":
            if(Math.ceil(Math.random() * 4) === 1) return "room8";
            if(bottomDoorClosed){
                randomnum = Math.ceil(Math.random() * 3) * 3;
                return `room${randomnum}`;
            }
            return "room4";

        case "room8":
            if(Math.ceil(Math.random() * 4) === 1) return "room9";
            return "room7";

        case "room9":
            randomnum = Math.ceil(Math.random() * 5);
            if(prevRoom === "room5" || prevRoom === "room6"){
                if(randomnum === 1) return "room6";
                else if(randomnum >= 2 && randomnum <= 4) return "room8";
                return "room5";
            }
            if(randomnum === 1 || randomnum === 2) return "room6";
            else if(randomnum === 3 || randomnum === 4) return "room5";
            return "room8";
    }

    return "room6"; // fallback
}
function chanceToHideCams(){
    if (Math.ceil(Math.random()*50)===1){
        hideCameras()
    }
}
goToRoom(`room${Math.ceil(Math.random()*3)* 3}`)
function gameLoop(){
    if (!gameRunning) return
    goToRoom(chooseRoom())
    updateBattery()
    chanceToHideCams()
    setTimeout(gameLoop, 1000)
}
gameLoop()
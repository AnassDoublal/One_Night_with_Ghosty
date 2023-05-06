import * as THREE from "./three.js";
import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.5.0/dist/tween.esm.js';

let M = {};

let V = 
{
    ambient: undefined,
    footsteps: undefined,
    grab: undefined,
    jumpscare: undefined,
    score: undefined,
    welcome: undefined,
    overlay: undefined,
    play: undefined,
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    ghost: 6,
    arrowDiv: undefined,
    upArrow: undefined,
    rightArrow: undefined,
    downArrow: undefined,
    leftArrow: undefined,
    arrowPath: undefined,
    monitorBtn: undefined,
    backFromMonitor: undefined,
    hide: undefined,
    studyBtn: undefined,
    nb: 0,
    nb_ghosty: 0,
    nb_reveal: 0,
    nb_pickup: 0
};
let C = {
    cameraTween: undefined,
    ghostyTween: undefined,
};

V.initAudio = function()
{
    this.ambient = new Audio("./Audio/ambient.mp3");
    this.ambient.loop = true;
    this.ambient.volume = 1;
    this.ambient.play();

    this.footsteps = new Audio("./Audio/footsteps.mp3");
    this.footsteps.volume = 1;

    this.grab = new Audio("./Audio/grab.mp3");
    this.grab.volume = 1;

    this.jumpscare = new Audio("./Audio/jumpscare.mp3");
    this.jumpscare.volume = .25;

    this.score = new Audio("./Audio/score.mp3");
    this.score.volume = .25;
}

V.initWelcome = function()
{
    this.welcome = document.querySelector(".welcome");
    this.overlay = document.querySelector(".overlay");
    this.play = document.querySelector(".play");

    this.play.addEventListener("click", function(){V.welcome.style.transform = "scale(0)"; V.overlay.style.transform = "scale(0)"; V.init();});
}

V.init = function()
{
    V.initAudio();

    V.canvasInit();

    this.arrowDiv = document.querySelector(".arrowDiv");
    this.arrowDiv.addEventListener("click", C.moveCamera);

    this.upArrow = this.arrowDiv.children[0];
    this.rightArrow = this.arrowDiv.children[1];
    this.downArrow = this.arrowDiv.children[2];
    this.leftArrow = this.arrowDiv.children[3];

    this.monitorBtn = document.querySelector(".monitorBtn");
    this.monitorBtn.addEventListener("click", C.getIntoMonitor);

    this.backFromMonitor = document.querySelector(".backFromMonitorBtn");
    this.backFromMonitor.addEventListener("click", C.backFromMonitor);

    this.hide = document.querySelector(".hideBtn");
    this.hide.addEventListener("click", C.hide);

    this.studyBtn = document.querySelector(".studyBtn");
    this.studyBtn.addEventListener("click", C.updateProgress);
    this.studyBtn.addEventListener("click", C.moveGhosty);

    this.arrowDiv.addEventListener("click", C.moveGhosty);

    this.arrowAvailability();

    this.bedroomBtnsManager();

    C.revealGhosty();

    C.itemsManager(THREE.code);
    C.itemsManager(THREE.formula);
    C.itemsManager(THREE.usbKey);
    C.itemsManager(THREE.techSheet1);
    C.itemsManager(THREE.techSheet2);

    setTimeout(function(){
            THREE.domEvents.addEventListener(THREE.revealGhosty, "click", C.revealGhosty);
            THREE.domEvents.addEventListener(THREE.btn, "mouseover", function(){document.body.style.cursor = "pointer";});
            THREE.domEvents.addEventListener(THREE.btn, "mouseout", function(){document.body.style.cursor = "auto";});
    }, 2000);
}

C.itemsManager = function(obj)
{
    THREE.domEvents.addEventListener(obj, "mouseover", function(){obj.scale.set(1.2, 1.2, 1.2); document.body.style.cursor = "pointer";});
    THREE.domEvents.addEventListener(obj, "mouseout", function(){obj.scale.set(1, 1, 1); document.body.style.cursor = "auto";});
}

V.canvasInit = function()
{
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");

    this.width = innerWidth;
    this.height = innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
}

V.draw = function(nb)
{
    V.ghost = new Image();
    V.ghost.src = "./Models/ghost.png";
    V.ghost.onload = function(){
        console.log(V.ghost);
        V.ctx.drawImage(V.ghost, V.canvas.width/5, V.canvas.height/5);
    }

    V.ctx.font = '48px Courier New';
    V.ctx.fillStyle = "#000";
    // V.ctx.fillText('Ghosty', V.canvas.width/3.7, V.canvas.height/5);

    V.ctx.fillText('Progress : ' + nb + '/50', V.canvas.width/2, V.canvas.height/2.5);

}

V.arrowAvailability = function()
{
    if(THREE.camera.position.z > 20)
    {
        V.downArrow.style.opacity = "0";
        V.downArrow.style.pointerEvents = "none";
    }
    else
    {
        V.downArrow.style.opacity = "1";
        V.downArrow.style.pointerEvents = "auto";
    }

    if(THREE.camera.position.x < -20)
    {
        V.leftArrow.style.opacity = "0";
        V.leftArrow.style.pointerEvents = "none";
    }
    else
    {
        V.leftArrow.style.opacity = "1";
        V.leftArrow.style.pointerEvents = "auto";
    }

    if(THREE.camera.position.z < -20)
    {
        V.upArrow.style.opacity = "0";
        V.upArrow.style.pointerEvents = "none";
    }
    else
    {
        V.upArrow.style.opacity = "1";
        V.upArrow.style.pointerEvents = "auto";
    }

    if(THREE.camera.position.x > 20)
    {
        V.rightArrow.style.opacity = "0";
        V.rightArrow.style.pointerEvents = "none";
    }
    else
    {
        V.rightArrow.style.opacity = "1";
        V.rightArrow.style.pointerEvents = "auto";
    }

    if(THREE.camera.position.z > 20 && THREE.camera.position.x < 1 && THREE.camera.position.x > -1)
    {
        V.upArrow.style.opacity = "0";
        V.upArrow.style.pointerEvents = "none";
    }

    if(THREE.camera.position.z > 8 && THREE.camera.position.z < 12 && THREE.camera.position.x < 1 && THREE.camera.position.x > 0)
    {
        V.downArrow.style.opacity = "0";
        V.downArrow.style.pointerEvents = "none";
    }

    if(THREE.camera.position.z > 0 && THREE.camera.position.z < 1 && THREE.camera.position.x < -20)
    {
        V.upArrow.style.opacity = "0";
        V.upArrow.style.pointerEvents = "none";
    }

    if(THREE.camera.position.z < -8 && THREE.camera.position.z > -12 && THREE.camera.position.x < -20)
    {
        V.downArrow.style.opacity = "0";
        V.downArrow.style.pointerEvents = "none";
    }
}

V.bedroomBtnsManager = function()
{
    if(THREE.camera.position.z > 20 && THREE.camera.position.x < 1 && THREE.camera.position.x > -1)
    {
        V.monitorBtn.style.opacity = "1";
        V.monitorBtn.style.pointerEvents = "auto";

        V.hide.style.opacity = "1";
        V.hide.style.pointerEvents = "auto";
    }
}

C.init = function()
{
    V.initWelcome();
}

V.playFootSteps = function(start, end)
{
    V.footsteps.currentTime = start;
    V.footsteps.play();

    setInterval(function(){
        if(V.footsteps.currentTime > end)
        {
            V.footsteps.pause();
            V.footsteps.currentTime = 0;
        }
    }, 1000);
}

C.moveCamera = function(ev)
{
    if(ev.target.tagName == "path")
        V.arrowPath = ev.target;
    else if(ev.target.tagName == "svg")
        V.arrowPath = ev.target.children[0];

    switch (V.arrowPath.parentElement.className.animVal){
        case "upArrow":
            V.playFootSteps(2.1, 4);

            V.upArrow.style.pointerEvents = "none";
            V.rightArrow.style.pointerEvents = "none";
            V.downArrow.style.pointerEvents = "none";
            V.leftArrow.style.pointerEvents = "none";

            let moveUp = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x, y: THREE.camera.position.y, z: THREE.camera.position.z-10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            C.cameraTween = moveUp;

            V.monitorBtn.style.opacity = "0";
            V.monitorBtn.style.pointerEvents = "none";

            V.hide.style.opacity = "0";
            V.hide.style.pointerEvents = "none";

            setTimeout(function(){V.upArrow.style.pointerEvents = "auto";
            V.rightArrow.style.pointerEvents = "auto";
            V.downArrow.style.pointerEvents = "auto";
            V.leftArrow.style.pointerEvents = "auto"; V.arrowAvailability(); V.bedroomBtnsManager();}, 2000);
            // THREE.camera.position.z -= 10;
            break;
        case "rightArrow":
            V.playFootSteps(1.8, 3.7);

            V.upArrow.style.pointerEvents = "none";
            V.rightArrow.style.pointerEvents = "none";
            V.downArrow.style.pointerEvents = "none";
            V.leftArrow.style.pointerEvents = "none";

            let rotateRight = new TWEEN.Tween(THREE.camera.rotation)
            .to({x: THREE.camera.rotation.x, y: -Math.PI/2, z: THREE.camera.rotation.z}, 500)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            let moveRight = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x+22, y: THREE.camera.position.y, z: THREE.camera.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            C.cameraTween = moveRight;

            V.monitorBtn.style.opacity = "0";
            V.monitorBtn.style.pointerEvents = "none";

            V.hide.style.opacity = "0";
            V.hide.style.pointerEvents = "none";

            setTimeout(function(){
                let fixRotate = new TWEEN.Tween(THREE.camera.rotation)
                .to({x: THREE.camera.rotation.x, y: THREE.camera.rotation.y+Math.PI/2, z: THREE.camera.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); V.bedroomBtnsManager();}, 
                2000);

            setTimeout(function(){V.upArrow.style.pointerEvents = "auto";
            V.rightArrow.style.pointerEvents = "auto";
            V.downArrow.style.pointerEvents = "auto";
            V.leftArrow.style.pointerEvents = "auto"; V.arrowAvailability()}, 2000);
            // THREE.camera.position.x += 10;
            break;
        case "downArrow":
            V.playFootSteps(1.8, 3.7);
            
            V.upArrow.style.pointerEvents = "none";
            V.rightArrow.style.pointerEvents = "none";
            V.downArrow.style.pointerEvents = "none";
            V.leftArrow.style.pointerEvents = "none";

            let rotateDown = new TWEEN.Tween(THREE.camera.rotation)
            .to({x: THREE.camera.rotation.x, y: -Math.PI, z: THREE.camera.rotation.z}, 500)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            let moveDown = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x, y: THREE.camera.position.y, z: THREE.camera.position.z+10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            C.cameraTween = moveDown;

            V.monitorBtn.style.opacity = "0";
            V.monitorBtn.style.pointerEvents = "none";

            V.hide.style.opacity = "0";
            V.hide.style.pointerEvents = "none";

            setTimeout(function(){
                let fixRotate = new TWEEN.Tween(THREE.camera.rotation)
                .to({x: THREE.camera.rotation.x, y: THREE.camera.rotation.y+Math.PI, z: THREE.camera.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); V.bedroomBtnsManager();}, 
                2000);
            
            setTimeout(function(){V.upArrow.style.pointerEvents = "auto";
            V.rightArrow.style.pointerEvents = "auto";
            V.downArrow.style.pointerEvents = "auto";
            V.leftArrow.style.pointerEvents = "auto"; V.arrowAvailability();}, 2000);
            // THREE.camera.position.z += 10;
            break;
        case "leftArrow":
            V.playFootSteps(1.8, 3.7);

            V.upArrow.style.pointerEvents = "none";
            V.rightArrow.style.pointerEvents = "none";
            V.downArrow.style.pointerEvents = "none";
            V.leftArrow.style.pointerEvents = "none";

            let rotateLeft = new TWEEN.Tween(THREE.camera.rotation)
            .to({x: THREE.camera.rotation.x, y: Math.PI/2, z: THREE.camera.rotation.z}, 500)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            let moveLeft = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x-22, y: THREE.camera.position.y, z: THREE.camera.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();

            C.cameraTween = moveLeft;

            V.monitorBtn.style.opacity = "0";
            V.monitorBtn.style.pointerEvents = "none";

            V.hide.style.opacity = "0";
            V.hide.style.pointerEvents = "none";

            setTimeout(function(){
                let fixRotate = new TWEEN.Tween(THREE.camera.rotation)
                .to({x: THREE.camera.rotation.x, y: THREE.camera.rotation.y-Math.PI/2, z: THREE.camera.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); V.bedroomBtnsManager();}, 
                2000);
            
            setTimeout(function(){V.upArrow.style.pointerEvents = "auto";
            V.rightArrow.style.pointerEvents = "auto";
            V.downArrow.style.pointerEvents = "auto";
            V.leftArrow.style.pointerEvents = "auto"; V.arrowAvailability();}, 2000);
            // THREE.camera.position.x -= 25;
            break;
    }

    let checkCollision = setInterval(function(){C.checkCollision(1)}, 100);
    setTimeout(function(){clearInterval(checkCollision)}, 2001);
}

C.getIntoMonitor = function(ev)
{
    ev.target.style.opacity = "0";
    ev.target.style.pointerEvents = "none";

    V.hide.style.opacity = "0"; 
    V.hide.style.pointerEvents = "none";

    V.leftArrow.style.opacity = "0";
    V.leftArrow.style.pointerEvents = "none";

    V.rightArrow.style.opacity = "0";
    V.rightArrow.style.pointerEvents = "none";

    let moveTowardsMonitor = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x, y: THREE.camera.position.y, z: THREE.camera.position.z-3.5}, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
    setTimeout(function(){V.draw(V.nb); V.backFromMonitor.style.opacity = "1"; V.backFromMonitor.style.pointerEvents="auto";
                          V.studyBtn.style.opacity = "1"; V.studyBtn.style.pointerEvents="auto";}, 1000);
}

C.backFromMonitor = function(ev)
{
    if(ev != undefined)
    {
        ev.target.style.opacity = "0";
        ev.target.style.pointerEvents = "none";
    
        V.studyBtn.style.opacity = "0";
        V.studyBtn.style.pointerEvents = "none";

        V.ctx.clearRect(0, 0, V.width, V.height);
    }

    let moveAwayFromMonitor = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x, y: THREE.camera.position.y, z: THREE.camera.position.z+3.5}, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            setTimeout(function(){V.monitorBtn.style.opacity = "1"; V.monitorBtn.style.pointerEvents="auto"; V.hide.style.opacity = "1"; V.hide.style.pointerEvents="auto"; V.leftArrow.style.opacity = "1"; V.leftArrow.style.pointerEvents = "auto"; V.rightArrow.style.opacity = "1"; V.rightArrow.style.pointerEvents = "auto";}, 1000);
}

C.hide = function()
{
    if(V.hide.textContent == "Hide")
    {
        V.monitorBtn.style.opacity = "0";
        V.monitorBtn.style.pointerEvents = "none";
    
        V.hide.style.opacity = "0";
        V.hide.style.pointerEvents = "none";

        V.leftArrow.style.opacity = "0";
        V.leftArrow.style.pointerEvents = "none";

        V.rightArrow.style.opacity = "0";
        V.rightArrow.style.pointerEvents = "none";
    
        let hideXY = new TWEEN.Tween(THREE.camera.position)
                .to({x: THREE.camera.position.x+0.99, y: THREE.camera.position.y-1.72, z: THREE.camera.position.z}, 800)
                .easing(TWEEN.Easing.Linear.None)
                .start();
        setTimeout(function(){let hideZ = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x, y: THREE.camera.position.y, z: THREE.camera.position.z+2.00}, 1200)
            .easing(TWEEN.Easing.Linear.None)
            .start();}, 800);
        setTimeout(function(){V.hide.style.opacity = "1"; V.hide.style.pointerEvents = "auto"; V.hide.textContent = "Leave"}, 2000);

        // setTimeout(function(){
        //     if(THREE.ghosty.position.x < 1 && THREE.ghosty.position.x > -1 && THREE.ghosty.position.z > 20)
        //         setTimeout(C.moveGhosty, 4000);
        // }, 2000);
    }
    else
    {
        V.hide.style.opacity = "0";
        V.hide.style.pointerEvents = "none";
    
        let leaveZ = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x, y: THREE.camera.position.y, z: THREE.camera.position.z-2.00}, 1200)
            .easing(TWEEN.Easing.Linear.None)
            .start();

        setTimeout(function(){let leaveXY = new TWEEN.Tween(THREE.camera.position)
            .to({x: THREE.camera.position.x-0.99, y: THREE.camera.position.y+1.72, z: THREE.camera.position.z}, 800)
            .easing(TWEEN.Easing.Linear.None)
            .start(); C.cameraTween = leaveXY;}, 1200);
        setTimeout(function(){V.hide.style.opacity = "1"; V.hide.style.pointerEvents = "auto"; V.hide.textContent = "Hide"; V.monitorBtn.style.opacity = "1"; V.monitorBtn.style.pointerEvents = "auto"; V.leftArrow.style.opacity = "1"; V.leftArrow.style.pointerEvents = "auto"; V.rightArrow.style.opacity = "1"; V.rightArrow.style.pointerEvents = "auto"; console.log(THREE.camera.position);}, 2000);

        let checkCollision = setInterval(function(){C.checkCollision(1)}, 100);
        setTimeout(function(){clearInterval(checkCollision)}, 2001);
    }

    C.moveGhosty();
    // let whileHidden = setInterval(C.moveGhosty, 2000);
    // setTimeout(function(){clearInterval(whileHidden)}, 3000);
}

C.hasPickedUp = function(obj)
{
    V.studyBtn.classList.add("deactivateStudyBtn");
    V.studyBtn.removeEventListener("click", C.updateProgress);
    V.studyBtn.removeEventListener("click", C.moveGhosty);
    C.moveGhosty();

    THREE.scene.add(obj);

    if(obj != THREE.techSheet1)
    {
        THREE.domEvents.addEventListener(obj, "click", function(){
            V.grab.play();
            THREE.scene.remove(obj);
            THREE.domEvents.removeEventListener(obj, "click");
            THREE.domEvents.removeEventListener(obj, "mouseover");
            V.studyBtn.style.pointerEvents = "auto";
            V.ctx.fillText('', V.canvas.width/2, V.canvas.height/1.6);
            V.studyBtn.classList.remove("deactivateStudyBtn");
            V.studyBtn.addEventListener("click", C.updateProgress);
            V.studyBtn.addEventListener("click", C.moveGhosty);
        });
    }
    else
    {
        THREE.scene.add(THREE.techSheet2);
        THREE.domEvents.addEventListener(obj, "click", function()
        {
            V.grab.play();
            THREE.scene.remove(obj);
            THREE.domEvents.removeEventListener(obj, "click");
            THREE.domEvents.removeEventListener(obj, "mouseover");

            if(V.nb_pickup < 1)
                V.nb_pickup++;
            else
            {
                V.studyBtn.style.pointerEvents = "auto";
                V.ctx.fillText('', V.canvas.width/2, V.canvas.height/1.6);
                V.studyBtn.classList.remove("deactivateStudyBtn");
                V.studyBtn.addEventListener("click", C.updateProgress);
                V.studyBtn.addEventListener("click", C.moveGhosty);
            }
        });
        THREE.domEvents.addEventListener(THREE.techSheet2, "click", function()
        {
            V.grab.play();
            THREE.scene.remove(THREE.techSheet2);
            THREE.domEvents.removeEventListener(THREE.techSheet2, "click");
            THREE.domEvents.removeEventListener(THREE.techSheet2, "mouseover");

            if(V.nb_pickup < 1)
                V.nb_pickup++;
            else
            {
                V.studyBtn.style.pointerEvents = "auto";
                V.ctx.fillText('', V.canvas.width/2, V.canvas.height/1.6);
                V.studyBtn.classList.remove("deactivateStudyBtn");
                V.studyBtn.addEventListener("click", C.updateProgress);
                V.studyBtn.addEventListener("click", C.moveGhosty);
            }
        });
    }
}

C.updateProgress = function(ev)
{
    V.studyBtn.textContent = "Loading...";
    V.studyBtn.classList.add("deactivateStudyBtn");
    V.studyBtn.removeEventListener("click", C.updateProgress);
    V.studyBtn.removeEventListener("click", C.moveGhosty);
    V.studyBtn.style.pointerEvents = "none";
    V.backFromMonitor.style.opacity = "0";
    V.backFromMonitor.style.pointerEvents = "none";
    C.moveGhosty();

    setTimeout(function(){
        V.studyBtn.classList.remove("deactivateStudyBtn");
        V.studyBtn.addEventListener("click", C.updateProgress);
        V.studyBtn.addEventListener("click", C.moveGhosty);
        V.studyBtn.style.pointerEvents = "auto";
        V.backFromMonitor.style.opacity = "1";
        V.backFromMonitor.style.pointerEvents = "auto";

        V.nb++;
        V.ctx.clearRect(0, 0, V.width, V.height);

        V.draw(V.nb);

        switch (V.nb)
        {
            case 4:
                V.score.play();
                V.studyBtn.textContent = "Deactivate module 1";
                break;
            case 11:
                V.score.play();
                V.studyBtn.textContent = "Deactivate module 2";
                break;
            case 18:
                V.score.play();
                V.studyBtn.style.pointerEvents = "none";
                V.studyBtn.textContent = "Deactivate module 3";
                V.ctx.font = "24px Lucida";
                V.ctx.fillStyle = "#ff0000";
                V.ctx.fillText('Code needed (living room)', V.canvas.width/1.81, V.canvas.height/1.6);
                C.hasPickedUp(THREE.code);
                break;
            case 21:
                V.score.play();
                V.studyBtn.textContent = "Deactivate module 4";
                break;
            case 25:
                V.score.play();
                V.studyBtn.textContent = "Deactivate module 5";
                break;
            case 30:
                V.score.play();
                V.studyBtn.style.pointerEvents = "none";
                V.studyBtn.textContent = "Deactivate module 6";
                V.ctx.font = "24px Lucida";
                V.ctx.fillStyle = "#ff0000";
                V.ctx.fillText('Formula needed (kitchen)', V.canvas.width/1.81, V.canvas.height/1.6);
                C.hasPickedUp(THREE.formula);
                break;
            case 36:
                V.score.play(); 
                V.studyBtn.textContent = "Deactivate module 7";
                break;
            case 41:
                V.score.play();
                V.studyBtn.style.pointerEvents = "none";
                V.studyBtn.textContent = "Deactivate module 8";
                V.ctx.font = "24px Lucida";
                V.ctx.fillStyle = "#ff0000";
                V.ctx.fillText('USB key needed (central hall)', V.canvas.width/1.81, V.canvas.height/1.6);
                C.hasPickedUp(THREE.usbKey);
                break;
            case 47:
                V.score.play();
                V.studyBtn.textContent = "Deactivate module 9";
                break;
            case 50:
                V.score.play();
                V.studyBtn.style.pointerEvents = "none";
                V.studyBtn.textContent = "Deactivate module 10";
                V.ctx.font = "24px Lucida";
                V.ctx.fillStyle = "#ff0000";
                V.ctx.fillText('Technical sheet page 1 & 2 needed (dining room & bathroom)', V.canvas.width/1.81, V.canvas.height/1.6);
                C.hasPickedUp(THREE.techSheet1);
                break;
            case 51:
                setTimeout(function(){V.ctx.clearRect(0, 0, V.width, V.height);}, 1);
                V.removeUI();
                V.play.textContent = "Rejouer";
                V.play.style.marginTop = "1em";
                V.welcome.textContent = "Vous avez survécu !";
                V.welcome.appendChild(V.play);
                V.welcome.style.transform = "scale(1) translate(-50%, -50%)";
                V.overlay.style.transform = "scale(1)";
                V.play.addEventListener("click", function(){location.reload()});
            default:
                V.studyBtn.textContent = "Study";
                break;     
        }
    }, 2000);

    let checkCollision = setInterval(function(){C.checkCollision(4)}, 100);
    setTimeout(function(){clearInterval(checkCollision)}, 2001);

}

C.moveGhosty = function()
{
    console.log(V.nb_ghosty);

    switch(V.nb_ghosty)
    {
        case 0:
            // setTimeout(function(){THREE.ghosty.position.x -= 22}, 2000);
            let position0 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x-22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position0;
            setTimeout(function(){THREE.sprite.position.x -= .48}, 2000);
            break;
        case 1:
            // setTimeout(function(){THREE.ghosty.position.x -= 22}, 2000);
            let position1 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x-22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position1;

            setTimeout(function(){
                let rotation1 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.x -= .5;
            }, 2000);
            break;
        case 2:
            // setTimeout(function(){THREE.ghosty.position.z += 10.5}, 2000);
            let position2 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z+10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position2;

            setTimeout(function(){
                let rotation2 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.y -= .225;
            }, 2000);
            break;
        case 3:
            // setTimeout(function(){THREE.ghosty.position.x += 22}, 2000);
            let position3 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x+22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position3;

            setTimeout(function(){
                let rotation3 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y-Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.x += .5;
            }, 2000);
            break;
        case 4:
            // setTimeout(function(){THREE.ghosty.position.z += 10.5}, 2000);
            let position4 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z+10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position4;

            setTimeout(function(){
                let rotation4 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y-Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.y -= .34;
            }, 2000);
            break;
        case 5:
            // setTimeout(function(){THREE.ghosty.position.x -= 22}, 2000);
            let position5 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x-22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position5;

            setTimeout(function(){
                let rotation5 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.x -= .5;
            }, 2000);
            break;
        case 6:
            // setTimeout(function(){THREE.ghosty.position.z += 10.5}, 2000);
            let position6 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z+10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start(); THREE.sprite.position.y -= .33;
            C.ghostyTween = position6;

            break;
        case 7:
            // setTimeout(function(){THREE.ghosty.position.z += 10.5}, 2000);
            let position7 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z+10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position7;

            setTimeout(function(){
                let rotation7 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.y -= .21;
            }, 2000);
            break;
        case 8:
            // setTimeout(function(){THREE.ghosty.position.x += 22}, 2000);
            let position8 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x+22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position8;

            setTimeout(function(){THREE.sprite.position.x += .48}, 2000);
            break;
        case 9:
            // setTimeout(function(){THREE.ghosty.position.x += 22}, 2000);
            let position9 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x+22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position9;

            setTimeout(function(){
                let rotation9 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.x += .49;
            }, 2000);
            break;
        case 10:
            // setTimeout(function(){THREE.ghosty.position.z -= 10.5}, 2000);
            let position10 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z-10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position10;

            setTimeout(function(){
                let rotation10 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.y += .21;
            }, 2000);
            break;
        case 11:
            // setTimeout(function(){THREE.ghosty.position.x -= 22}, 2000);
            let position11 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x-22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position11;

            setTimeout(function(){
                let rotation11 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y-Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.x -= .47;
            }, 2000);
            break;
        case 12:
            // setTimeout(function(){THREE.ghosty.position.z -= 10.5}, 2000);
            let position12 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z-10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position12;

            setTimeout(function(){
                let rotation12 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y-Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.y += .34;
            }, 2000);
            break;
        case 13:
            // setTimeout(function(){THREE.ghosty.position.x += 22}, 2000);
            let position13 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x+22, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position13;

            setTimeout(function(){
                let rotation13 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.x += .48;
            }, 2000);
            break;
        case 14:
            // setTimeout(function(){THREE.ghosty.position.z -= 10.5}, 2000);
            let position14 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z-10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position14;

            setTimeout(function(){THREE.sprite.position.y += .32}, 2000);
            break;
        case 15:
            // setTimeout(function(){THREE.ghosty.position.z -= 10.5}, 2000);
            let position15 = new TWEEN.Tween(THREE.ghosty.position)
            .to({x: THREE.ghosty.position.x, y: THREE.ghosty.position.y, z: THREE.ghosty.position.z-10.5}, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .start();
            C.ghostyTween = position15;

            setTimeout(function(){
                let rotation15 = new TWEEN.Tween(THREE.ghosty.rotation)
                .to({x: THREE.ghosty.rotation.x, y: THREE.ghosty.rotation.y+Math.PI/2, z: THREE.ghosty.rotation.z}, 500)
                .easing(TWEEN.Easing.Linear.None)
                .start(); THREE.sprite.position.y += .235;
            }, 2000);
            V.nb_ghosty = -1;
            break;
    }

    V.nb_ghosty++;
}

C.checkCollision = function(zPos)
{
    console.log("isEnabled");
    if(THREE.camera.position.x-THREE.ghosty.position.x < 1 && THREE.camera.position.z-THREE.ghosty.position.z < zPos)
        if(THREE.camera.position.x-THREE.ghosty.position.x > -1 && THREE.camera.position.z-THREE.ghosty.position.z > -zPos)
        {
            V.jumpscare.play();

            if(C.cameraTween != undefined)
                C.cameraTween.stop();

            setTimeout(function(){V.ctx.clearRect(0, 0, V.width, V.height);}, 1);
            // C.ghostyTween.stop();

            V.removeUI();

            // THREE.ghosty.position.set(100, -1, 0);
            THREE.camera.position.z = 100;
            THREE.ghostyGameOver.scale.set(0.005, 0.005, 0.005);

            setTimeout(function(){location.reload()}, 5000);

            // let liltest = new TWEEN.Tween(THREE.ghosty.position)
            // .to({x: 500, y: 0, z: 0}, 1)
            // .easing(TWEEN.Easing.Linear.None)
            // .start();

            // let liltest1 = new TWEEN.Tween(THREE.camera.position)
            // .to({x: 500, y: 0, z: 5}, 1)
            // .easing(TWEEN.Easing.Linear.None)
            // .start();
        }
}

V.removeUI = function()
{
    V.arrowDiv.remove();
    V.monitorBtn.remove();
    V.backFromMonitor.remove();
    V.hide.remove();
    V.studyBtn.remove();
}

C.revealGhosty = function()
{
    V.nb_reveal += .5;
    // if(THREE.camera.position.z > 20 && THREE.camera.position.x < 1 && THREE.camera.position.x > 0)
    //     g;

    if(V.nb_reveal > 1 && V.nb_reveal < 6)
    {
        THREE.domEvents.removeEventListener(THREE.revealGhosty, "click");

        setTimeout(function(){
            THREE.domEvents.addEventListener(THREE.revealGhosty, "click", C.revealGhosty);
        }, 2000);
    }

    let fadeIn = new TWEEN.Tween(THREE.sprite.material)
    .to({opacity: 1}, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .start();

    setTimeout(function(){
        let fadeOut = new TWEEN.Tween(THREE.sprite.material)
        .to({opacity: 0}, 1000)
        .easing(TWEEN.Easing.Linear.None)
        .start();
    }, 1600);

    if(V.nb_reveal >= 6)
    {
        setTimeout(function(){
            THREE.scene.remove(THREE.revealGhosty);
        }, 2000);

        THREE.domEvents.removeEventListener(THREE.revealGhosty, "click");
    }
}

C.animate = function(){
        requestAnimationFrame(C.animate);
        TWEEN.update();
    // planeMesh.rotation.x += 0.01;
}

C.animate();

C.init();

console.log(THREE.scene);
console.log(THREE.camera);

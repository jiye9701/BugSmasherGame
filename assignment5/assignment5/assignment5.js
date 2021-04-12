//header
//function bling() {
//    if (flag === 0) {
//        document.querySelector('h1').style.color = '#45ABA0';
//        flag++;
//    } else if (flag === 1) {
//        document.querySelector('h1').style.color = '#FEB327';
//        flag++;
//    } else if (flag === 2) {
//        document.querySelector('h1').style.color = '#FF2828';
//        flag++;
//    } else {
//        document.querySelector('h1').style.color = '#F25BB6';
//        flag = 0;
//    }
//}
//setInterval(bling, 1000);



// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var timer = 0;
var caught = false;
var fps = 10;  //frame rate
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 550;


//Background  no web4
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

//Bug
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
    bugReady = true;
};
bugImage.src = "images/bug.png";


var bug = {};
var bugCaught = 0;

var reset = function () {
    bug.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        bug.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (bug.y < 100)
};

//event
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {

    if (e.button != 0) return;

    mouseXinCanvas = e.clientX;
    mouseYinCanvas = e.clientY;

    if (bugBody(bug, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 20000 / fps);
        reset();
        render();
    }
};

//body
function bugBody(bug, x, y) {

    if (x <= (bug.x + 80)
        && bug.x <= (x + 80)
        && y <= (bug.y + 80)
        && bug.y <= (y + 80)
    ) {
        fps = fps + 5;
        bugCaught++;
        return true;
    }
    return false;
};

//Reset Score box
function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};

//Reset speed box
function ResetSpeed(x, y) {
    if (x > (605)
        && x < (845)
        && y > (15)
        && y < (85)
    ) {
        fps = 10;
        return true;
    }
    return false;
};

var render = function () {


    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    if (bgReady) {
        ctx.drawImage(bgImage, 0, 100);
    }
    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
    if (caught == true) {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 100);
        }
        caught = false;
    }



//Title
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgb(68, 147, 142)";
    ctx.font = "30px Verdana";
    ctx.fillText("Bug Smasher!", 5, 40);

//Score

    //function Caughtbug() {
    //    bugCaught++;
    //    document.querySelector("#score").innerHTML = bugCaught;
    //    Resetbug();

    //}
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + bugCaught, 10, 10);



// Reset Score, Speed button   -300
    ctx.fillStyle = "rgb(220, 241, 239)";
    ctx.fillRect(250, 10, 250, 80);
    ctx.fillRect(520, 10, 250, 80);

    ctx.fillStyle = "rgb(220, 241, 239";
    ctx.fillRect(255, 15, 240, 70);
    ctx.fillRect(525, 15, 240, 70);

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "30px Verdana";
    ctx.fillText("Reset Score", 275, 30);
    ctx.fillText("Reset Speed", 545, 30);
    //ctx.globalAlpha = "0.8";
};

// The main game loop
var main = function () {
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};


//


reset();
main();




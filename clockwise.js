const contentName = "clockwise";
const contentDate = "2022年9月24日";

document.title = contentName;

addObj(svg, "rect", ["x", 0, "y", 0, "width", 900, "height", 1600, "fill", "#EEEEEE"]);

let input = addText(svg, "35", ["x", 200, "y", 450, "font-size", 150, "fill", "black", "pointer-events", "none"]);
let edge =  addText(svg, "0", ["x", 580, "y", 450, "font-size", 150, "fill", "black", "pointer-events", "none", "text-anchor", "end"]);
let edgeGoal =  addText(svg, "/24", ["x", 700, "y", 450, "font-size", 150, "fill", "black", "pointer-events", "none"]);

let btn = [];
btn.push(addButton("circle", ["cx", 450, "cy", 1190, "r", 80,"ontouchstart", "push(evt,0)"]));

btn.push(addButton("circle", ["cx", 250, "cy", 590, "r", 80,"ontouchstart", "push(evt,1)"]));
btn.push(addButton("circle", ["cx", 450, "cy", 590, "r", 80,"ontouchstart", "push(evt,2)"]));
btn.push(addButton("circle", ["cx", 650, "cy", 590, "r", 80,"ontouchstart", "push(evt,3)"]));
btn.push(addButton("circle", ["cx", 250, "cy", 790, "r", 80,"ontouchstart", "push(evt,4)"]));
btn.push(addButton("circle", ["cx", 450, "cy", 790, "r", 80,"ontouchstart", "push(evt,5)"]));
btn.push(addButton("circle", ["cx", 650, "cy", 790, "r", 80,"ontouchstart", "push(evt,6)"]));
btn.push(addButton("circle", ["cx", 250, "cy", 990, "r", 80,"ontouchstart", "push(evt,7)"]));
btn.push(addButton("circle", ["cx", 450, "cy", 990, "r", 80,"ontouchstart", "push(evt,8)"]));
btn.push(addButton("circle", ["cx", 650, "cy", 990, "r", 80,"ontouchstart", "push(evt,9)"]));

btn.forEach(b => {b.setAttribute("stroke", "black"); b.setAttribute("stroke-width", 5);});

addButton("rect", ["x", 25, "y", 1330, "width", 250, "height", 130, "ontouchstart", "clearInput(evt)"]);
addText(svg, "C", ["x", 150, "y", 1425, "id", "enter", "font-size", 80, "fill", "black", "pointer-events", "none"]);

addButton("rect", ["x", 325, "y", 1330, "width", 250, "height", 130, "ontouchstart", "enter(evt)"]);
addText(svg, "ENTER", ["x", 450, "y", 1420, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);
let enterBlocker = addObj(svg, "rect", ["x", 325, "y", 1330, "width", 250, "height", 130, "fill", "black", "fill-opacity", 0.5]);

addButton("rect", ["x", 625, "y", 1330, "width", 250, "height", 130, "ontouchstart", "reset(evt)"]);
addText(svg, "RESET", ["x", 750, "y", 1420, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);


let errorObj = [];
errorObj.push(addObj(svg, "rect", ["x", 50, "y", 600, "width", 800, "height", 400, "fill", "#999999", "stroke", "black", "stroke-width", 5]));
errorObj.push(addText(svg, "ERROR.", ["x", 450, "y",800, "font-size", 150, "fill", "red"]));
errorObj.push(addButton("rect", ["x", 350, "y", 850, "width", 200, "height", 80, "ontouchstart", "closeError(evt)"]));
errorObj.push(addText(svg, "OK", ["x", 450, "y", 915, "font-size", 60, "fill", "black"]));

errorObj.forEach(obj => {obj.setAttribute("display", "none")});

let inputNow = 0;
input.textContent = inputNow;
const color = "red";
let angleSum = 0;
let edgeSum = 0;
edge.textContent = inputNow;
let lastAngle = 0;
let firstAngle = 0;

function push(evt, num)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    if (inputNow >= 10) return;

    inputNow *= 10;
    inputNow += num;

    input.textContent = inputNow;
    if (inputNow >= 3) enterBlocker.setAttribute("display", "none");
}

function clearInput(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");

    inputNow = 0;
    input.textContent = inputNow;
    enterBlocker.setAttribute("display", "inline");
}

function enter(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    

    let angle = 180.0 - 360.0 / inputNow;
    angleSum += angle;

    if (lastAngle + angle == 180) 
    {
        edgeSum--;
        console.log(1);
    }

    if (edgeSum != "-")
    {
        if (edgeSum == 0) edgeSum += inputNow;
        else if (angleSum < 360) edgeSum += inputNow - 2;
        else if (angleSum == 360) edgeSum += inputNow - 4;
        else edgeSum = "-";
    }

    if (firstAngle == 0) firstAngle = angle;
    if (angleSum == 360 && firstAngle + angle == 180) 
    {
        edgeSum--;
        console.log(2);
    }
    
    inputNow = 0;
    input.textContent = inputNow;
    edge.textContent = edgeSum;

    if (angleSum == 180) edge.textContent = edgeSum - 1;


    lastAngle = angle;

    if (angleSum == 360) edge.setAttribute("fill", "red");
    else edge.setAttribute("fill", "black");

    if (angleSum == 360 && edgeSum == 24)
    {
        clearEvt();
    }

    enterBlocker.setAttribute("display", "inline");
}

function reset(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    btn.forEach(obj => obj.setAttribute("stroke", "black"));

    inputNow = 0;
    input.textContent = inputNow;
    edgeSum = 0;
    edge.textContent = 0;
    edge.setAttribute("fill", "black");
    angleSum = 0;
    lastAngle = 0;
    firstAngle = 0;
    enterBlocker.setAttribute("display", "inline");
}

function closeError(evt)
{
    console.log("close");
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    errorObj.forEach(obj => {obj.setAttribute("display", "none")});
}

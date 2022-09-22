const contentName = "symmetric";
const contentDate = "2022年9月x日";

document.title = contentName;

addObj(svg, "rect", ["x", 0, "y", 0, "width", 900, "height", 1600, "fill", "#EEEEEE"]);

let input = addText(svg, "35", ["x", 450, "y", 420, "font-size", 150, "fill", "black", "pointer-events", "none"])

let btn = [];
btn.push(addButton("circle", ["cx", 450, "cy", 1170, "r", 80,"ontouchstart", "push(evt,0)"]));

btn.push(addButton("circle", ["cx", 250, "cy", 570, "r", 80,"ontouchstart", "push(evt,1)"]));
btn.push(addButton("circle", ["cx", 450, "cy", 570, "r", 80,"ontouchstart", "push(evt,2)"]));
btn.push(addButton("circle", ["cx", 650, "cy", 570, "r", 80,"ontouchstart", "push(evt,3)"]));
btn.push(addButton("circle", ["cx", 250, "cy", 770, "r", 80,"ontouchstart", "push(evt,4)"]));
btn.push(addButton("circle", ["cx", 450, "cy", 770, "r", 80,"ontouchstart", "push(evt,5)"]));
btn.push(addButton("circle", ["cx", 650, "cy", 770, "r", 80,"ontouchstart", "push(evt,6)"]));
btn.push(addButton("circle", ["cx", 250, "cy", 970, "r", 80,"ontouchstart", "push(evt,7)"]));
btn.push(addButton("circle", ["cx", 450, "cy", 970, "r", 80,"ontouchstart", "push(evt,8)"]));
btn.push(addButton("circle", ["cx", 650, "cy", 970, "r", 80,"ontouchstart", "push(evt,9)"]));

btn.forEach(b => {b.setAttribute("stroke", "black"); b.setAttribute("stroke-width", 5);});

addButton("rect", ["x", 25, "y", 1330, "width", 250, "height", 130, "ontouchstart", "clearInput(evt)"]);
addText(svg, "C", ["x", 150, "y", 1425, "id", "enter", "font-size", 80, "fill", "black", "pointer-events", "none"]);

addButton("rect", ["x", 325, "y", 1330, "width", 250, "height", 130, "ontouchstart", "enter(evt)"]);
addText(svg, "ENTER", ["x", 450, "y", 1420, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);

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

function push(evt, num)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    
    inputNow *= 10;
    inputNow += num;

    input.textContent = inputNow;
    
}

function clearInput(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");

    inputNow = 0;
    input.textContent = inputNow;
}

function enter(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    let angle = 180.0 - 360.0 / inputNow;
    let buf = inputNow;
    while (buf % 2 == 0) buf /= 2;
    while (buf % 5 == 0) buf /= 5;
    if ( (buf > 1 && 360 % inputNow > 0) || inputNow <= 2) 
    {
        errorObj.forEach(obj => {obj.setAttribute("display", "inline")});
        reset(evt);
        return;
    }
    let angleString = angle + "";
    Array.prototype.forEach.call(angleString, c => {
        if (0 <= c && c <= 9)
        {
            
            if (btn[c].getAttribute("stroke") == color) 
            {
                btn[c].setAttribute("stroke", "black");
            }
            else btn[c].setAttribute("stroke", color);
        }
    })

    inputNow = 0;
    input.textContent = inputNow;

    let clear = true;
    btn.forEach(obj => {
        if(!(obj.getAttribute("stroke") == color))
        {
            clear = false;
        }
    })
    if (clear)
    {
        clearEvt();
    }
}

function reset(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    btn.forEach(obj => obj.setAttribute("stroke", "black"));

    inputNow = 0;
    input.textContent = inputNow;
}

function closeError(evt)
{
    console.log("close");
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    errorObj.forEach(obj => {obj.setAttribute("display", "none")});
}

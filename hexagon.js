const contentName = "hexagon";
const contentDate = "2022年8月12日";

document.title = contentName;

addObj(svg, "rect", ["x", 0, "y", 0, "width", 900, "height", 1600, "fill", "#EEEEEE"]);

let hex0 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3]);
let hex1 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3, "transform", "translate(174,0)"]);
let hex2 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3, "transform", "translate(87,150)"]);
let hex3 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3, "transform", "translate(-87,150)"]);
let hex4 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3, "transform", "translate(-174,0)"]);
let hex5 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3, "transform", "translate(-87,-150)"]);
let hex6 = addObj(svg, "polygon", ["points", "450,650 537,700 537,800 450,850 363,800 363,700", "fill", "none", "stroke", "black", "stroke-width", 3, "transform", "translate(87,-150)"]);
let hex = [hex0, hex1, hex2, hex3, hex4, hex5, hex6];

let slash = [];
const slashPos = [[0,0],[174,0],[87,150],[-87,150],[-174,0],[-87,-150],[87,-150]];
for (let i=0; i<7; i++)
{
    let obj = addObj(svg, "g", ["transform", "translate(" + slashPos[i][0] + " " + slashPos[i][1] + ")", "stroke", "black", "stroke-width", 2]);
    addObj(obj, "line", ["x1", 400, "y1", 700, "x2", 500, "y2", 800]);
    addObj(obj, "line", ["x1", 500, "y1", 700, "x2", 400, "y2", 800]);
    slash.push(obj);
}

addButton("circle", ["cx", 800, "cy", 750, "r", 70,"ontouchstart", "move(evt,0)"]);
addButton("circle", ["cx", 625, "cy", 1053, "r", 70,"ontouchstart", "move(evt,1)"]);
addButton("circle", ["cx", 275, "cy", 1053, "r", 70,"ontouchstart", "move(evt,2)"]);
addButton("circle", ["cx", 100, "cy", 750, "r", 70,"ontouchstart", "move(evt,3)"]);
addButton("circle", ["cx", 275, "cy", 447, "r", 70,"ontouchstart", "move(evt,4)"]);
addButton("circle", ["cx", 625, "cy", 447, "r", 70,"ontouchstart", "move(evt,5)"]);

addButton("circle", ["cx", 275, "cy", 1295, "r", 70, "ontouchstart", "enter(evt)"])
addButton("rect", ["x", 475, "y", 1230, "width", 250, "height", 130, "ontouchstart", "reset(evt)"]);
addText(svg, "RESET", ["x", 600, "y", 1320, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);


const price = 623;
let payMoney = 0;
const moneyArr = [500, 100, 50, 10, 5, 1];

let pos = [5,1];
let key = ["qwertyuiop","asdfghjkl","zxcvbnm"];
const hexPos = [[0,0],[1,0],[0,1],[-1,1],[-1,0],[0,-1],[1,-1]];
let blueMap = [];

function move(evt, dir)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    if (dir == 0)
    {
        pos[0]++;
    }
    else if (dir == 1)
    {
        pos[1]++;
    }
    else if (dir == 2)
    {
        pos[0]--;
        pos[1]++;
    }
    else if (dir == 3)
    {
        pos[0]--;
    }
    else if (dir == 4)
    {
        pos[1]--;
    }
    else if (dir == 5)
    {
        pos[0]++;
        pos[1]--;
    }
    draw();
    
}

function draw()
{
    for (let i=0; i<7; i++)
    {
        slash[i].setAttribute("stroke", "none");
        let look = [pos[0] + hexPos[i][0], pos[1] + hexPos[i][1]];
        if (key[look[1]] != undefined)
        {
            let c = key[look[1]][look[0]];
            if (c != undefined && "gray".indexOf(c) >= 0)
            {
                hex[i].setAttribute("fill", "gray");
            }
            else if(c != undefined && "pink".indexOf(c) >= 0)
            {
                hex[i].setAttribute("fill", "pink");
            }
            else
            {
                hex[i].setAttribute("fill", "white");
                blueMap.forEach(element => {
                    if (element[0] == look[0] && element[1] == look[1])
                    {
                        hex[i].setAttribute("fill", "blue");
                    }
                });
                if (c == undefined) slash[i].setAttribute("stroke", "black");
            }
        }
        else
        {
            hex[i].setAttribute("fill", "white");
            slash[i].setAttribute("stroke", "black");
        }
    }
}

draw();

function enter(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    if (hex[0].getAttribute("fill") == "gray" || hex[0].getAttribute("fill") == "pink") return;
    if (slash[0].getAttribute("stroke") != "none") return;
    for (let i=0; i<blueMap.length; i++)
    {
        if (blueMap[i][0] == pos[0] && blueMap[i][1] == pos[1])
        {
            blueMap.splice(i, 1);
            draw();
            return;
        }
    }
    blueMap.push([pos[0], pos[1]]);
    draw();

    if (blueMap.length == 4)
    {
        let clear = true;
        blueMap.forEach(element => {
            if ("blue".indexOf(key[element[1]][element[0]]) < 0) clear = false;
        });
        if (clear) clearEvt();
    }
}

function reset(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    pos[0] = 5;
    pos[1] = 1;
    blueMap = [];
    draw();
}
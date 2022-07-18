const contentName = "dial";
const contentDate = "2022年x月x日";

document.title = contentName;

addObj(svg, "rect", ["x", 0, "y", 0, "width", 900, "height", 1600, "fill", "#EEEEEE"]);

const space = 140;
const cy = 550;
const r = 60;
let lines = [];

for (let i=0; i<6; i++)
{
    let cx =  (900 - space * 5) / 2 + space * i;
    let btn = addButton("circle", ["cx",cx , "cy",cy, "r", r, "ontouchstart", "turn(" + i + ")"]);
    lines.push(addObj(svg, "line", ["x1", cx-r, "y1", cy, "x2", cx+r, "y2", cy, "stroke-width", 10, 
    "stroke", "black", "pointer-events", "none"]));
}

addObj(svg, "rect", ["x", 70, "y", 650, "width", 760, "height", 400, "fill", "#AAAAAA"]);

const lampSpaceX = 100;
const lampSpaceY = 150;
const lampR = 30;
let lamps = new Array(12);
for (let i=0; i<6; i++)
{
    let cx =  (900 - lampSpaceX * 5) / 2 + lampSpaceX * i;
    lamps[i] = addObj(svg, "circle", ["cx", cx, "cy", 850-lampSpaceY/2, "r", lampR, "fill", "#666666"]);
    lamps[i+6] = addObj(svg, "circle", ["cx", cx, "cy", 850+lampSpaceY/2, "r", lampR, "fill", "#666666"]);
}

let ring = addObj(svg, "circle", ["cx", 500, "cy", 500, "fill", "none", "stroke", "#00FF00", "stroke-width", 5, "display", "none"]);

setInterval(() => {
    let alpha = ring.getAttribute("stroke-opacity");
    if (alpha <= 0)
    {
        setAttributes(ring, ["r", lampR, "stroke-opacity", 1]);
    }
    else
    {
        alpha-=0.1;
        setAttributes(ring, ["r", lampR+(1-alpha)*20, "stroke-opacity", alpha]);
    }
}, 100);

const lineStat = [0, 0, 0, 0, 0, 0];
let cleared = false;

function turn(id)
{
    lineStat[id] += 1;
    if (lineStat[id] == 4) lineStat[id] = 0;
    let cx =  (900 - space * 5) / 2 + space * id;
    let theta = 0;
    if (lineStat[id] == 1) theta = Math.PI * 0.42;
    else if (lineStat[id] == 2) theta = Math.PI * 0.5;
    else if (lineStat[id] == 3) theta = Math.PI * 0.58;
    setAttributes(lines[id], ["x1", cx-r*Math.cos(theta), "x2", cx+r*Math.cos(theta), "y1", cy-r*Math.sin(theta), "y2", cy+r*Math.sin(theta)])

    let romaString = "";
    for (let i=0; i<6; i++)
    {
        if (lineStat[i] == 2)
        {
           romaString += "i"; 
        } 
        else if (i<4 && lineStat[i]==1 && lineStat[i+1]==0 && lineStat[i+2]==3)
        {
            romaString+="v";
            i+=2;
        }
        else if (i<5 && lineStat[i]==1 && lineStat[i+1]==3)
        {
            romaString+="x";
            i++;
        }
        else if (i<5 && lineStat[i]==1)
        {
            romaString+="N";
        }
        else if (i>0 && lineStat[i]==3)
        {
            romaString+="Z";
        }
    }
    
    if (romaString == "i") lampEvent(0);
    else if (romaString == "ii") lampEvent(1);
    else if (romaString == "iii") lampEvent(2);
    else if (romaString == "iv") lampEvent(3);
    else if (romaString == "v") lampEvent(4);
    else if (romaString == "vi") lampEvent(5);
    else if (romaString == "vii") lampEvent(6);
    else if (romaString == "viii") lampEvent(7);
    else if (romaString == "ix") lampEvent(8);
    else if (romaString == "x") lampEvent(9);
    else if (romaString == "xi") lampEvent(10);
    else if (romaString == "xii") lampEvent(11);
    else ring.setAttribute("display", "none");

    if (!cleared)
    {
        for (let i=0; i<12; i++)
        {
            if (lamps[i].getAttribute("fill") != "#00FF00")
            {
                break;
            }
            if (i == 11)
            {
                cleared = true;
                clearEvt();
            }
        }
    }
}

function lampEvent(num)
{
    lamps[num].setAttribute("fill", "#00FF00");
    setAttributes(ring, ["display", "inline", "cx", lamps[num].getAttribute("cx"), "cy", lamps[num].getAttribute("cy")])
}

addButton("rect", ["x", 325, "y", 1230, "width", 250, "height", 130, "ontouchstart", "reset(evt)"]);
addText(svg, "RESET", ["x", 450, "y", 1320, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);


function reset(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    for (let i=0; i<12; i++)
    {
        lamps[i].setAttribute("fill", "#666666");
    }
    ring.setAttribute("display", "none");
    for (let i=0; i<6; i++)
    {
        let cx =  (900 - space * 5) / 2 + space * i;
        setAttributes(lines[i],["x1", cx-r, "y1", cy, "x2", cx+r, "y2", cy]);
        lineStat[i] = 0;
    }
}
const contentObj = allInfo.art;

const width = window.innerWidth;

camera.style.width = width;
camera.style.height = width * 10 / 6;

let map = [
    [0,2,3],
    [1,2,3],
    [1,2,3],
    [1,2,3],
    [1,2,3],
    [1,2,0],
    [0,0,0],
]

//0:white 1:black 2:orange 3:green
const colors = ["white", "black", "#ff8c00", "green"];
const ART = ["A", "R", "T"];

let tiles = new Array(7);
for (let i=0; i<7; i++) tiles[i] = new Array(3);

let backTile = document.createElement("div");
camera.appendChild(backTile);
backTile.style.width = width * 0.15 * 3;
backTile.style.height = width * 0.15 * 7;
backTile.style.top = width * (0.35);
backTile.style.left = width * (0.33);
backTile.style.backgroundColor = "white";
backTile.classList.add("canvasButton");

function init()
{
    map = [
        [0,2,3],
        [1,2,3],
        [1,2,3],
        [1,2,3],
        [1,2,3],
        [1,2,0],
        [0,0,0],
    ];

    for (let i=0; i<7; i++)
    {
        for (let j=0; j<3; j++)
        {
            if (tiles[i][j] != undefined) camera.removeChild(tiles[i][j]);
            if (map[i][j] == 0) 
            {
                tiles[i][j] = undefined;
                continue;
            }
            let button = document.createElement("div");
            camera.appendChild(button);
            button.style.width = width * 0.152;
            button.style.height = width * 0.152;
            button.style.top = width * (0.15 * i + 0.35);
            button.style.left = width * (0.15 * j + 0.33);
            button.style.backgroundColor = colors[map[i][j]];
            button.style.zIndex = j * 7 + i;
            button.setAttribute("ontouchstart","pick(event," + i + "," + j + ")");
            button.classList.add("canvasButton");
            tiles[i][j] = button;
        }
    }
    setText();
}


let pickTile = {};
pickTile.picking = false;
window.addEventListener("touchmove", move, { passive: false });
window.addEventListener("touchend", end, { passive: false });
let fixing = false;

function pick(event,y,x){
    if (fixing) return;
    if (event.touches.length > 1) return;
    if (pickTile.picking) return;
    pickTile.picking = true;
    pickTile.x = x;
    pickTile.y = y;
    pickTile.obj = tiles[y][x];
    move(event);
}

let artText = new Array(3);
for (let i=-1; i<3; i++)
{
    let table = document.createElement("div");
    table.classList.add("artTable");
    table.style.top =  width * (0.15 * 3 + 0.35);
    table.style.left = width * (0.15 * i + 0.33);
    table.style.width = width * 0.15;
    table.style.height = width * 0.15;
    camera.appendChild(table); 
    let obj = document.createElement("p");
    obj.classList.add("artText");
    obj.innerText = "";
    obj.style.fontSize = width * 0.1;
    obj.style.fontWeight = 700;
    obj.style.opacity = 1;
    table.appendChild(obj);
    if (i >= 0) artText[i] = obj;
    else
    {
        obj.style.color = "red";
        obj.innerText = "▶";
    }
}

function move(event)
{
    if (pickTile.picking == false) return;
    event.preventDefault();
    if (event.touches.length > 1) return;
    
    pickTile.obj.style.left = event.touches[0].pageX - width * 0.15 / 2;
    pickTile.obj.style.top = event.touches[0].pageY - width * 0.15 / 2;
    pickTile.obj.style.zIndex = 200;
}

function end(event)
{
    if (pickTile.picking == false) return;
    event.preventDefault();
    if (event.touches.length > 0) return;
    let left = pickTile.obj.style.left;
    left = left.slice(0, left.length - 2);
    let top = pickTile.obj.style.top;
    top = top.slice(0, top.length - 2);
    let gridX = Math.round((left - width * 0.33) / (width * 0.15));
    let gridY = Math.round((top - width * 0.35) / (width * 0.15));

    if (gridX < 0 || gridX >= 3 || gridY < 0 || gridY >= 7)
    {
        gridX = pickTile.x;
        gridY = pickTile.y;
    }

    fixing = true;
    posFix(pickTile.obj, gridX, gridY, 0);
    
    pickTile.picking = false;
    let buf = map[gridY][gridX];
    map[gridY][gridX] = map[pickTile.y][pickTile.x];
    map[pickTile.y][pickTile.x] = buf;

    pickTile.obj.setAttribute("ontouchstart", "pick(event," + gridY + "," + gridX + ")");

    let obj = tiles[gridY][gridX];
    if (obj != pickTile.obj && obj != undefined)
    {
        obj.setAttribute("ontouchstart", "pick(event," + pickTile.y + "," + pickTile.x + ")");
        obj.style.zIndex = 100;
        posFix(obj, pickTile.x, pickTile.y, 0);
    }

    tiles[gridY][gridX] = tiles[pickTile.y][pickTile.x];
    tiles[pickTile.y][pickTile.x] = obj;

    setText();
}

function posFix(obj, x, y, speed)
{
    let left = obj.style.left;
    left = parseFloat(left.slice(0, left.length - 2));
    let top = obj.style.top;
    top = parseFloat(top.slice(0, top.length - 2));
    let vec = {"x": width * (0.33 + 0.15 * x) - left, "y": width * (0.35 + 0.15 * y) - top};
    vec.magnitude = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    if (speed == 0) speed = Math.max(vec.magnitude / 100 / 0.2, width * 0.001);
    if (vec.magnitude < speed)
    {
        obj.style.left = width * (0.33 + 0.15 * x);
        obj.style.top = width * (0.35 + 0.15 * y);
        fixing = false;
        obj.style.zIndex = x*7 + y;
        return;
    }
    else
    {
        obj.style.left = left + vec.x * (speed / vec.magnitude);
        obj.style.top = top + vec.y * (speed / vec.magnitude);
        window.setTimeout(() => {posFix(obj, x, y, speed);}, 10);
    }
}

function setText()
{
    let ans = "";
    for (let i=0; i<3; i++)
    {
        let nextText = "";
        for (let j=0; j<3; j++)
        {
            for (let k=0; k<5; k++)
            {
                if (map[j+k][i] != 0) 
                {
                    break;
                }
                if (k == 4)
                {
                    nextText = "WHITE".charAt(3 - j);
                }
            }
        }
        for (let j=0; j<3; j++)
        {
            for (let k=0; k<5; k++)
            {
                if (map[j+k][i] != 1) 
                {
                    break;
                }
                if (k == 4)
                {
                    nextText = "BLACK".charAt(3 - j);
                }
            }
        }
        for (let j=0; j<2; j++)
        {
            for (let k=0; k<6; k++)
            {
                if (map[j+k][i] != 2) 
                {
                    break;
                }
                if (k == 5)
                {
                    nextText = "ORANGE".charAt(3 - j);
                }
            }
        }
        for (let j=0; j<3; j++)
        {
            for (let k=0; k<5; k++)
            {
                if (map[j+k][i] != 3) 
                {
                    break;
                }
                if (k == 4)
                {
                    nextText = "GREEN".charAt(3 - j);
                    
                }
            }
        }
        animateText(artText[i], nextText, nextText == ART[i] ? "red" : "#888888");
        ans += nextText;
        if (artText[i].innerText == ART[i])
        {
            artText[i].style.color = "red";
        }
        else
        {
            artText[i].style.color = "#888888";
        }
    }
    if (ans == "ART") window.setTimeout(clearEvt, 300);
}

function animateText(obj, text, color)
{
    if (obj.innerText == text && obj.style.opacity == 1) return;
    if (obj.innerText != text)
    {
        if (parseFloat(obj.style.opacity) > 0) obj.style.opacity = parseFloat(obj.style.opacity) - 0.07;
        else 
        {
            obj.innerText = text;
            obj.style.color = color;
        }
    } 
    else 
    {
        obj.style.opacity = parseFloat(obj.style.opacity) + 0.07;
    }
    window.setTimeout(() => {animateText(obj, text, color);}, 10);
}


resetButton.style.top = width * 1.5;
resetButton.style.left = width * 0.4;

function reset()
{
    resetButton.style.backgroundColor = "#AAAAAA";
    init();
    if (clearImage != null)
    {
        clearImage.remove();
        tweetdiv.remove();
    }
}

init();
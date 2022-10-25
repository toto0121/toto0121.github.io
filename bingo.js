const contentObj = allInfo.bingo;

const bingoTextChar = "オニエカセキコヌトスアタノチ";
const bingoTextGridPos = [[0,4],[4,1],[0,3],[1,0],[2,3],[1,1],[1,4],[4,2],[3,4],[2,2],[0,0],[3,0],[4,4],[3,1]];
const bingoTextStartPos = [
    [0.15, 1.01], [0.27, 1.03], [0.45, 1],[0.55, 1.02],[0.7, 0.97],
    [0.17, 1.16],[0.29, 1.14],[0.4, 1.15],[0.75,1.17],
    [0.16, 1.33],[0.25, 1.3],[0.43, 1.28],[0.57, 1.2],[0.65,1.31]];
const bingoTextObj = [];

let frame = document.createElement("div");
frame.classList.add("frame");
frame.style.left = width * 0.1;
frame.style.top = width * 0.95;
frame.style.width = width * 0.8;
frame.style.height = width * 0.2;
frame.style.border = width * 0.01 + "px solid red";
camera.appendChild(frame);

for (let i=0; i<14; i++)
{
    let table = document.createElement("div");
    table.classList.add("bingoTable");
    table.style.width = width * 0.15;
    table.style.height = width * 0.15;
    table.setAttribute("ontouchstart", "pick(event," + i + ")");
    table.setAttribute("ontouchmove", "move(event)");
    table.setAttribute("ontouchend", "end(event)");
    camera.appendChild(table); 
    let obj = document.createElement("p");
    obj.classList.add("bingoText");
    obj.innerText = bingoTextChar[i];
    obj.style.fontSize = width * 0.1;
    obj.style.fontWeight = 700;
    obj.style.opacity = 1;
    table.appendChild(obj);
    bingoTextObj.push(table);
}

let pickTile = {};
let inFrame = [];

function init()
{
    inFrame = [];
    for (let i=0; i<14; i++)
    {
        bingoTextObj[i].style.transition = "500ms";
        bingoTextObj[i].style.left = width * bingoTextStartPos[i][0];
        bingoTextObj[i].style.top =  width * bingoTextStartPos[i][1];
        window.setTimeout(() => {bingoTextObj[i].style.transition = "0ms";}, 500);
    }
    for (let i=0; i<5; i++)
    {
       inFrame.push(bingoTextObj[i]);
    } 

    drawGrid();
}

function pick(event,id){
    if (event.touches.length > 1) return;
    if (pickTile.picking) return;
    pickTile.picking = true;
    pickTile.obj = bingoTextObj[id];
    pickTile.obj.style.transition = "0ms";
    pickTile.startPos = [pickTile.obj.style.left, pickTile.obj.style.top];
    move(event);
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
    pickTile.picking = false;
    pickTile.obj.style.zIndex = 100;
    
    let top = pickTile.obj.style.top;
    top.slice(0, top.length - 2);
    if (parseFloat(top) < width * (0.95 - 0.15 / 2))
    {
        fix();
    }
    else if (parseFloat(top) < width * (1.15 - 0.15 / 2))
    {
        if (inFrame.indexOf(pickTile.obj) < 0)
        {
            if (inFrame.length == 5)
            {
                fix();
            }
            else
            {
                inFrame.push(pickTile.obj);
            }
        }
    }
    else
    {
        if (inFrame.indexOf(pickTile.obj) >= 0)
        {
            inFrame.splice(inFrame.indexOf(pickTile.obj), 1);
        }
    }
    drawGrid();
}

function fix()
{
    pickTile.obj.style.transition = "500ms";
    pickTile.obj.style.left = pickTile.startPos[0];
    pickTile.obj.style.top = pickTile.startPos[1];
    
}


let bingoGrid = [];

for (let i=0; i<5; i++)
{
    bingoGrid.push([]);
    for (let j=0; j<5; j++)
    {
        let obj = document.createElement("div");
        obj.classList.add("frame");
        obj.style.left = width * (0.25 + 0.1 * j);
        obj.style.top = width * (0.38 + 0.1 * i);
        obj.style.width = width * 0.1;
        obj.style.height = width * 0.1;
        obj.style.border = width * 0.003 + "px solid black";
        camera.appendChild(obj);
        bingoGrid[i].push(obj);
    }
}

resetButton.style.top = width * 1.5;
resetButton.style.left = width * 0.4;

function drawGrid()
{
    for (let i=0; i<5; i++)
    {
        for (let j=0; j<5; j++)
        {
            bingoGrid[i][j].style.backgroundColor = "white";
        }
    }
    inFrame.forEach(element => {
        let id = bingoTextObj.indexOf(element);
        let x = 4 - bingoTextGridPos[id][0];
        let y = bingoTextGridPos[id][1];
        bingoGrid[y][x].style.backgroundColor = "#ff8c00";
    });

    if (inFrame.indexOf(bingoTextObj[2]) >= 0 && inFrame.indexOf(bingoTextObj[3]) >= 0)
    {
        let l1 = bingoTextObj[2].style.left;
        l1.slice(0, l1.length - 2);
        l1 = parseFloat(l1);
        let t1 = bingoTextObj[2].style.top;
        t1.slice(0, t1.length - 2);
        t1 = parseFloat(t1);
        let l2 = bingoTextObj[3].style.left;
        l2.slice(0, l2.length - 2);
        l2 = parseFloat(l2);
        let t2 = bingoTextObj[3].style.top;
        t2.slice(0, t2.length - 2);
        t2 = parseFloat(t2);

        if (l2 - l1 < 0.12 * width && l2 - l1 > 0.06 * width && Math.abs(t2 - t1) < 0.025 * width)
        {
            bingoGrid[0][3].style.backgroundColor = "white";
            bingoGrid[3][4].style.backgroundColor = "white";
            bingoGrid[4][3].style.backgroundColor = "#ff8c00";
            bingoGrid[2][4].style.backgroundColor = "#ff8c00";
        }
    }

    if (inFrame.indexOf(bingoTextObj[8]) >= 0 && inFrame.indexOf(bingoTextObj[11]) >= 0)
    {
        let l1 = bingoTextObj[11].style.left;
        l1.slice(0, l1.length - 2);
        l1 = parseFloat(l1);
        let t1 = bingoTextObj[11].style.top;
        t1.slice(0, t1.length - 2);
        t1 = parseFloat(t1);
        let l2 = bingoTextObj[8].style.left;
        l2.slice(0, l2.length - 2);
        l2 = parseFloat(l2);
        let t2 = bingoTextObj[8].style.top;
        t2.slice(0, t2.length - 2);
        t2 = parseFloat(t2);

        if (l2 - l1 < 0.1 * width && l2 - l1 > 0.04 * width && Math.abs(t2 - t1) < 0.025 * width)
        {
            bingoGrid[0][1].style.backgroundColor = "white";
            bingoGrid[4][1].style.backgroundColor = "white";
            bingoGrid[4][2].style.backgroundColor = "#ff8c00";
            bingoGrid[4][1].style.backgroundColor = "#ff8c00";
        }
    }

    let cleared = true;
    for (let i=0; i<5; i++)
    {
        if (bingoGrid[4][i].style.backgroundColor == "white")
        {
            cleared = false;
            break;
        }
    }
    if (cleared) window.setTimeout(clearEvt, 500);
}

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
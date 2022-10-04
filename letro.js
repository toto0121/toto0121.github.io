const contentName = "letro";
const contentDate = "2022年10月7日";

const canvas = document.getElementById("canvas");
const width = window.innerWidth;
canvas.setAttribute("width", width);
canvas.setAttribute("height", width * 10 / 6);
if (canvas.getContext)
{ 
    const ctx = canvas.getContext("2d");//2次元描画
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0,0,width,width * 10 / 6);//塗りつぶされた四角形
    
    ctx.fillStyle = "#8fbc8f";
    ctx.fillRect(width * (0.8 / 6), width * (2.8 / 6), width * (4.4 / 6), width * (4.4 / 6));
    ctx.beginPath();
    ctx.strokeStyle = "#2e8b57";
    ctx.lineWidth = width * 0.003;
    ctx.setLineDash([width * 0.01,width * 0.01]);
    for (let i=1; i<6; i++)
    {
        ctx.moveTo(width * (i / 6), width * (2.8 / 6));
        ctx.lineTo(width * (i / 6), width * (7.2 / 6));
    }

    for (let i=1; i<6; i++)
    {
        ctx.moveTo(width * (0.8 / 6), width * ((2 + i) / 6));
        ctx.lineTo(width * (5.2 / 6), width * ((2+i)/ 6));
    }
    
    ctx.stroke();

    ctx.fillRect(width * (0.8 / 6), width * (7.8 / 6), width * (1.4 / 6), width * (1.4 / 6));
    for (let i=1; i<3; i++)
    {
        ctx.moveTo(width * (i / 6), width * (7.8 / 6));
        ctx.lineTo(width * (i / 6), width * (9.2 / 6));
    }

    for (let i=1; i<3; i++)
    {
        ctx.moveTo(width * (0.8 / 6), width * ((7 + i) / 6));
        ctx.lineTo(width * (2.2 / 6), width * ((7+i)/ 6));
    }

    ctx.stroke();
}

camera.style.width = width;
camera.style.height = width * 10 / 6;

let nextText = document.createElement("p");
nextText.textContent = "NEXT";
nextText.classList.add("nextText");
nextText.style.top = width * 1.48;
nextText.style.left = width * 0.18;

camera.appendChild(nextText);

window.addEventListener("touchstart", () => {start(event);}, { passive: false });
window.addEventListener("touchmove", () => {move(event);}, { passive: false });
window.addEventListener("touchend", () => {end(event);}, { passive: false });

let block;
let blockMap = [
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,0,0,0,0,1],
    [1,1,1,1,1,1],
    [1,0,1,1,1,1],
    [1,1,1,1,1,1],
];
let blockNum = 0;
let allBlocks = [];

let XMap = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

let nextBlock = new Array(3);
let lastBlockBig = false;
let lastBlockObj;

function setNextBlock(x, y)
{
    let obj = document.createElement("div");
    obj.style.position = "absolute";
    obj.style.width = width / 12;
    obj.style.height = width / 12;
    obj.style.left = x;
    obj.style.top = y;
    obj.style.backgroundColor = "rgba(25,25,25,1)";
    obj.style.pointerEvents = "none";
    return obj;
}

nextBlock[0] = setNextBlock(width / 6, 8.5 * width / 6);
nextBlock[0].appendChild(setNextBlock(0, -0.5 * width / 6));
nextBlock[0].appendChild(setNextBlock(0.5 * width / 6, 0));
camera.appendChild(nextBlock[0]);

nextBlock[1] = setNextBlock(1.5 * width / 6, 8 * width / 6);
nextBlock[1].appendChild(setNextBlock(-0.5 * width / 6, 0));
nextBlock[1].appendChild(setNextBlock(0, 0.5 * width / 6));

nextBlock[2] = setNextBlock(1.25 * width / 6, 8.25 * width / 6);

function start(event)
{
    event.preventDefault();
    if (event.target == resetButton)
    {
        block = null;
        return;
    } 
    if (blockNum > 2) return;
    block = document.createElement("div");
    block.style.position = "absolute";
    block.style.width = width / 6;
    block.style.height = width / 6;
    if (blockNum == 0)
    {
        let child1 = document.createElement("div");
        child1.style.position = "absolute";
        child1.style.width = width / 6;
        child1.style.height = width / 6;
        child1.style.bottom = width / 6;
        block.appendChild(child1);

        let child2 = document.createElement("div");
        child2.style.position = "absolute";
        child2.style.width = width / 6;
        child2.style.height = width / 6;
        child2.style.left = width / 6;
        block.appendChild(child2);
    }
    else if (blockNum == 1)
    {
        let child1 = document.createElement("div");
        child1.style.position = "absolute";
        child1.style.width = width / 6;
        child1.style.height = width / 6;
        child1.style.top = width / 6;
        block.appendChild(child1);

        let child2 = document.createElement("div");
        child2.style.position = "absolute";
        child2.style.width = width / 6;
        child2.style.height = width / 6;
        child2.style.right = width / 6;
        block.appendChild(child2);
    }
    else if (blockNum == 2 && lastBlockBig)
    {
        let child1 = document.createElement("div");
        child1.style.position = "absolute";
        child1.style.width = width / 6;
        child1.style.height = width / 6;
        child1.style.bottom = width / 6;
        block.appendChild(child1);

        let child2 = document.createElement("div");
        child2.style.position = "absolute";
        child2.style.width = width / 6;
        child2.style.height = width / 6;
        child2.style.left = width / 6;
        block.appendChild(child2);

        let child3 = document.createElement("div");
        child3.style.position = "absolute";
        child3.style.width = width / 6;
        child3.style.height = width / 6;
        child3.style.bottom = width / 6;
        child3.style.left = width / 6;
        block.appendChild(child3);
    }

    move(event);
    
    camera.appendChild(block);
    allBlocks.push(block);

    if (lastBlockBig) camera.removeChild(lastBlockObj);
    else camera.removeChild(nextBlock[blockNum]);

    if (blockNum < 2) camera.appendChild(nextBlock[blockNum + 1]);
    
}

function move(event)
{
    event.preventDefault();
    if (block == null) return;
    if (blockNum > 2) return;
    let gridX = Math.floor(event.touches[0].pageX / (width / 6));
    let gridY = Math.floor(event.touches[0].pageY / (width / 6));
    
    if (blockNum == 0)
    {
        if (gridX > 4) gridX = 4;
        if (gridY < 1) gridY = 1;
        if(blockMap[gridY][gridX] == 0 && blockMap[gridY - 1][gridX] == 0 && blockMap[gridY][gridX + 1] == 0) 
        {
            block.style.backgroundColor = "rgba(25,25,25,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(25,25,25,0.5)"});
        }
        else
        {
            block.style.backgroundColor = "rgba(255,70,70,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(255,70,70,0.5)"});
        }
    }
    else if (blockNum == 1)
    {
        if (gridX < 1) gridX = 1;
        if (gridY > 8) gridY = 8;
        if(blockMap[gridY][gridX] == 0 && blockMap[gridY + 1][gridX] == 0 && blockMap[gridY][gridX - 1] == 0) 
        {
            block.style.backgroundColor = "rgba(25,25,25,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(25,25,25,0.5)"});
        }
        else
        {
            block.style.backgroundColor = "rgba(255,70,70,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(255,70,70,0.5)"});
        }
    } 
    else if (blockNum == 2 && !lastBlockBig)
    {
        if(blockMap[gridY][gridX] == 0) 
        {
            block.style.backgroundColor = "rgba(25,25,25,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(25,25,25,0.5)"});
        }
        else
        {
            block.style.backgroundColor = "rgba(255,70,70,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(255,70,70,0.5)"});
        }   
    }
    else if (blockNum == 2 && lastBlockBig)
    {
        if (gridX > 4) gridX = 4;
        if (gridY < 1) gridY = 1;
        if(blockMap[gridY][gridX] == 0 && blockMap[gridY][gridX+1] == 0 && blockMap[gridY-1][gridX] == 0 && blockMap[gridY-1][gridX+1] == 0) 
        {
            block.style.backgroundColor = "rgba(25,25,25,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(25,25,25,0.5)"});
        }
        else
        {
            block.style.backgroundColor = "rgba(255,70,70,0.5)";
            block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(255,70,70,0.5)"});
        }   
    }

    block.style.top = gridY * (width / 6);
    block.style.left= gridX * (width / 6);
}

function end(event)
{
    event.preventDefault();
    if (block == null) return;
    if (blockNum > 2) return;
    let gridX = Math.floor(event.changedTouches[0].pageX / (width / 6));
    let gridY = Math.floor(event.changedTouches[0].pageY / (width / 6));
    if (block.style.backgroundColor == "rgba(25, 25, 25, 0.5)")
    {
        block.style.backgroundColor = "rgba(25,25,25,1)";
        block.childNodes.forEach(e => {e.style.backgroundColor = "rgba(25,25,25,1)"});
        if (blockNum == 0)
        {
            blockMap[gridY][gridX] = 1;
            blockMap[gridY - 1][gridX] = 1;
            blockMap[gridY][gridX + 1] = 1;
        }
        else if (blockNum == 1)
        {
            blockMap[gridY][gridX] = 1;
            blockMap[gridY + 1][gridX] = 1;
            blockMap[gridY][gridX - 1] = 1;
        }
        else if (!lastBlockBig && blockNum == 2)
        {
            blockMap[gridY][gridX] = 1;
        }
        else if (lastBlockBig && blockNum == 2)
        {
            blockMap[gridY][gridX] = 1;
            blockMap[gridY - 1][gridX] = 1;
            blockMap[gridY][gridX + 1] = 1;
            blockMap[gridY - 1][gridX + 1] = 1;
        }

        if (blockNum == 2 && gridX == 1 && gridY == 8)
        {
            lastBlockBig = true;
            lastBlockObj = block;
            allBlocks.pop();
        }
        else blockNum++;

        for (let i=0; i<4; i++)
        {
            for (let j=0; j<4; j++)
            {
                if (blockMap[i+3][j+1] == 1 && blockMap[6-i][4-j] == 0)
                {
                    if (XMap[i][j] == 0)
                    {
                        camera.appendChild(XObj[i][j]);
                        XMap[i][j] = 1;
                    }
                    
                }
                else
                {
                    if (XMap[i][j] == 1)
                    {
                        camera.removeChild(XObj[i][j]);
                        XMap[i][j] = 0;
                    }
                    
                }
            }
        }

        if (blockNum == 3)
        {
            let clearBool = true;
            for (let i=0; i<4; i++)
            {
                for (let j=0; j<4; j++)
                {
                    if (XMap[i][j] == 1)
                    {
                        clearBool = false;
                    }
                }
            }            
            if (clearBool)
            {
                clearEvt();
            }
        }
    }
    else
    {
        camera.removeChild(block);
        allBlocks.pop();
        if (blockNum < 2) camera.removeChild(nextBlock[blockNum + 1]);
        if (lastBlockBig) camera.appendChild(lastBlockObj);
        else camera.appendChild(nextBlock[blockNum]);
    }
}

function setXUnit(x, y)
{
    let obj = document.createElement("div");
    obj.style.position = "absolute";
    obj.style.width = width / 6 / 9;
    obj.style.height = width / 6 / 9;
    obj.style.left = x;
    obj.style.top = y;
    obj.style.backgroundColor = "#8fbc8f";
    return obj;
}

let XObj = [[],[],[],[]];
for (let i=0; i<4; i++)
{
    for (let j=0; j<4; j++)
    {
        let obj = document.createElement("div");
        obj.style.position = "absolute";
        obj.style.top = (i + 3) * width / 6;
        obj.style.left = (j + 1) * width / 6;
        obj.style.width = width / 6;
        obj.style.height = width / 6;
        for (let k=1; k<8; k++)
        {
            obj.appendChild(setXUnit(k * width / 6 / 9, k * width / 6 / 9));
            obj.appendChild(setXUnit(k * width / 6 / 9, (8-k) * width / 6 / 9));
        }
        XObj[i].push(obj);
    }
}

function drawX(x, y)
{
    camera.appendChild(XObj[y][x]);
}

resetButton.style.top = width * 1.36;
resetButton.style.left = width * 0.62;

function reset()
{
    resetButton.style.backgroundColor = "#AAAAAA";
    blockMap = [
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,0,0,0,0,1],
        [1,1,1,1,1,1],
        [1,0,1,1,1,1],
        [1,1,1,1,1,1],
    ];

    allBlocks.forEach(e => {
        camera.removeChild(e);
    });

    allBlocks = [];

    for (let i=0; i<4; i++)
    {
        for (let j=0; j<4; j++)
        {
            if (XMap[i][j] == 1)
            {
                camera.removeChild(XObj[i][j]);
                XMap[i][j] = 0;
            }
        }
    }

    if (blockNum < 3) camera.removeChild(nextBlock[blockNum]);
    blockNum = 0;
    camera.appendChild(nextBlock[0]);

    lastBlockBig = false;
}
const contentObj = allInfo.sort;
const width = window.innerWidth;

const canvas = document.getElementById("canvas");
canvas.setAttribute("width", width);
canvas.setAttribute("height", width * 10 / 6);
if (canvas.getContext)
{ 
    const ctx = canvas.getContext("2d");//2次元描画
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0,0,width,width * 10.5 / 6);//塗りつぶされた四角形

    ctx.strokeStyle = "#000000";
    
}
let sortButtons = new Array(4);
for (let i=0; i<4; i++)
{
    let button = document.createElement("div");
    sortButtons[i] = button;
    button.style.width = width * 0.18;
    button.style.height = width * 0.18;
    button.style.left = width * (0.11 + 0.2 * i);
    button.style.top = width * 1.2;
    button.setAttribute("ontouchstart","sortPush(" + i + ")");
    button.classList.add("circleButton");
    camera.appendChild(button);
}



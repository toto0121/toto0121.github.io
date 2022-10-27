const contentObj = allInfo.spin;

const initVal = ["6+6","2123+332","16"];

let formula1 = "6+6";
let spinObjs = [[],[],[],[]];
for (let i=0; i<3; i++)
{
    let obj = document.createElement("img");
    obj.classList.add("spinObj");
    obj.style.height = width * 0.13;
    obj.style.top = width * 0.3;
    obj.style.left = width * (0.285 + 0.15 * i);
    obj.src = "image/spin_" + formula1[i] + ".png";
    obj.setAttribute("ontouchstart", "spin(event,0," + i + ")");
    obj.spinDeg = 0;
    obj.val = formula1[i];
    spinObjs[0].push(obj);
    camera.appendChild(obj);
}

let equal1 = document.createElement("img");
equal1.classList.add("spinObj");
equal1.style.height = width * 0.08;
equal1.style.top = width * 0.48;
equal1.style.left = width * 0.46;
equal1.src = "image/spin_eq_bk.png";
camera.appendChild(equal1);

let ans1Obj = [];
let ans1 = "12";
for (let i=0; i<2; i++)
{
    let obj = document.createElement("img");
    obj.classList.add("spinObj");
    obj.style.height = width * 0.13;
    obj.style.top = width * 0.6;
    obj.style.left = width * (0.36 + 0.15 * i);
    obj.src = "image/spin_" + ans1[i] + ".png";
    obj.style.opacity = 1;
    ans1Obj.push(obj);
    camera.appendChild(obj);
}

let formula2 = "2123+332";
for (let i=0; i<8; i++)
{
    let obj = document.createElement("img");
    obj.classList.add("spinObj");
    obj.style.height = width * 0.13;
    obj.style.top = width * (0.85 + 0.15 * Math.floor(i / 4));
    obj.style.left = width * (0.21 + 0.15 * (i % 4));
    obj.src = "image/spin_" + formula2[i] + ".png";
    obj.setAttribute("ontouchstart", "spin(event,1," + i + ")");
    obj.spinDeg = 0;
    obj.val = formula2[i];
    spinObjs[1].push(obj);
    camera.appendChild(obj);
}

let equal2 = document.createElement("img");
equal2.classList.add("spinObj");
equal2.style.height = width * 0.08;
equal2.style.top = width * 1.18;
equal2.style.left = width * 0.46;
equal2.src = "image/spin_neq.png";
camera.appendChild(equal2);

let formula3 = "16";

for (let i=0; i<2; i++)
{
    let obj = document.createElement("img");
    obj.classList.add("spinObj");
    obj.style.height = width * 0.13;
    obj.style.top = width * 1.3;
    obj.style.left = width * (0.36 + 0.15 * i);
    obj.src = "image/spin_" + formula3[i] + ".png";
    obj.setAttribute("ontouchstart","spin(event,2," + i + ")");
    obj.spinDeg = 0;
    obj.val = formula3[i];
    spinObjs[2].push(obj);
    camera.appendChild(obj);
}

let animating = false;
let ans2eq = false;

function spin(event,i, j)
{
    event.preventDefault();
    if (animating) return;
    animating = true;
    let obj = spinObjs[i][j];
    
    if (obj.val == "+" || obj.val == "*")
    {
        spinAnimation(obj, 45, obj.spinDeg);
        if (obj.val == "+") obj.val = "*";
        else obj.val = "+";
    }
    else if (obj.val == "6" || obj.val == "9")
    {
        spinAnimation(obj, 180, obj.spinDeg);
        if (obj.val == "6") obj.val = "9";
        else obj.val = "6";
    }
    else
    {
        spinAnimation(obj, 90, obj.spinDeg);
        if (obj.val == "1") obj.val = "-";
        else if (obj.val == "-") obj.val = "1";
        else if (obj.val == "2") obj.val = "N";
        else if (obj.val == "N") obj.val = "2";
        else if (obj.val == "3") obj.val = "W";
        else if (obj.val == "W") obj.val = "E";
        else if (obj.val == "E") obj.val = "M";
        else if (obj.val == "M") obj.val = "3";
    }
    
    
    if (i == 0)
    {
        formula1 = spinObjs[0][0].val + spinObjs[0][1].val + spinObjs[0][2].val;
        ans1 = Function('"use strict";return (' + formula1 + ")")() + "";
        for (let i=0; i<2; i++)
        {
            changeAnimation(ans1Obj[i], "image/spin_" + ans1[i] + ".png", false);
        }
    }

    

    let ans2 = "";
    for (let i=0; i<8; i++) ans2 += spinObjs[1][i].val;
    if (ans2 == "N1NE+EEN" && (spinObjs[2][0].val + spinObjs[2][1].val == "19") && !ans2eq) 
    {
        changeAnimation(equal2, "image/spin_eq_r.png", false);
        window.setTimeout(clearEvt, 500);
        ans2eq = true;
    }
    else if ((ans2 != "N1NE+EEN" || (spinObjs[2][0].val + spinObjs[2][1].val != "19")) && ans2eq)
    {
        changeAnimation(equal2, "image/spin_neq.png", false);
        ans2eq = false;
    }
}

function spinAnimation(obj, deg, startDeg)
{
    obj.spinDeg += deg / 45;
    obj.style.transform = "rotate(" + (obj.spinDeg) + "deg)";
    if (obj.spinDeg - startDeg >= deg)
    {
        obj.style.transform = "rotate(" + (startDeg + deg) + "deg)";
        animating = false;
    }
    else
    {
        window.setTimeout(() => {spinAnimation(obj, deg, startDeg);}, 10);
    }
}

function changeAnimation(obj, nextSrc, changed)
{
    let c = changed;
    if (obj.style.opacity == "") obj.style.opacity = 1;
    if (c)
    {
        if (parseFloat(obj.style.opacity) >= 1) return;
        obj.style.opacity = parseFloat(obj.style.opacity) + 0.05;
    }
    else
    {
        obj.style.opacity = parseFloat(obj.style.opacity) - 0.05;
        if (parseFloat(obj.style.opacity) <= 0) 
        {
            obj.src = nextSrc;
            c = true;
        }
    }
    window.setTimeout(() => {changeAnimation(obj, nextSrc, c);}, 10);
}

resetButton.style.top = width * 1.5;
resetButton.style.left = width * 0.375;

function init()
{
    for (let i=0; i<3; i++)
    {
        for (let j=0; j<spinObjs[i].length; j++)
        {
            let obj = spinObjs[i][j];
            obj.val = initVal[i][j];
            obj.spinDeg = 0;
            obj.style.transform = "rotate(0deg)";
        }
    }
    ans1 = "12";
    for (let i=0; i<2; i++)
    {
        ans1Obj[i].src = "image/spin_" + ans1[i] + ".png";
    }
    equal2.src = "image/spin_neq.png";
}

function preload()
{
    const srcs = ["spin_4", "spin_5", "spin_8", "spin_eq_r", "clear", "tweet"]
    srcs.forEach(e => {
        document.createElement("img").src = "image/" + e + ".png";
    });   
}

preload();
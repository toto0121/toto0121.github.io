const contentName = "change";
const contentDate = "2022年6月23日";

document.title = contentName;

addObj(svg, "rect", ["x", 0, "y", 0, "width", 900, "height", 1600, "fill", "#EEEEEE"]);

addButton("circle", ["cx", 250, "cy",900, "r", 80, "ontouchstart", "pay(evt, 500)"]);
addButton("circle", ["cx", 450, "cy",900, "r", 80, "ontouchstart", "pay(evt, 100)"]);
addButton("circle", ["cx", 650, "cy",900, "r", 80, "ontouchstart", "pay(evt, 50)"]);
addButton("circle", ["cx", 250, "cy",1100, "r", 80, "ontouchstart", "pay(evt, 10)"]);
addButton("circle", ["cx", 450, "cy",1100, "r", 80, "ontouchstart", "pay(evt, 5)"]);
addButton("circle", ["cx", 650, "cy",1100, "r", 80, "ontouchstart", "pay(evt, 1)"]);

addText(svg, "0", ["x", 250, "y", 935, "id", "500yen", "font-size", 100, "fill", "black", "pointer-events", "none"]);
addText(svg, "0", ["x", 450, "y", 935, "id", "100yen", "font-size", 100, "fill", "black", "pointer-events", "none"]);
addText(svg, "0", ["x", 650, "y", 935, "id", "50yen", "font-size", 100, "fill", "black", "pointer-events", "none"]);
addText(svg, "0", ["x", 250, "y", 1135, "id", "10yen", "font-size", 100, "fill", "black", "pointer-events", "none"]);
addText(svg, "0", ["x", 450, "y", 1135, "id", "5yen", "font-size", 100, "fill", "black", "pointer-events", "none"]);
addText(svg, "0", ["x", 650, "y", 1135, "id", "1yen", "font-size", 100, "fill", "black", "pointer-events", "none"]);

addButton("rect", ["x", 175, "y", 1230, "width", 250, "height", 130, "ontouchstart", "enter(evt)"]);
const enterGreen = addObj(svg, "rect", ["x", 175, "y", 1230, "width", 250, "height", 130, "fill", "#00FF00", "fill-opacity", 0, "pointer-events", "none"])
addText(svg, "ENTER", ["x", 300, "y", 1320, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);

addButton("rect", ["x", 475, "y", 1230, "width", 250, "height", 130, "ontouchstart", "reset(evt)"]);
addText(svg, "RESET", ["x", 600, "y", 1320, "id", "enter", "font-size", 60, "fill", "black", "pointer-events", "none"]);

addText(svg, "Score", ["x", 450, "y", 400, "font-size", "100", "fill", "black"]);
const score = addText(svg, "-", ["x", 450, "y", 600, "font-size", 150, "fill", "black"])

const price = 623;
let payMoney = 0;
const moneyArr = [500, 100, 50, 10, 5, 1];

function pay(evt, money)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    const text = document.getElementById(money + "yen");
    text.textContent = parseInt(text.textContent) + 1;
    payMoney += money;
    if (payMoney >= price) enterGreen.setAttribute("fill-opacity", 0.7); 
}

function enter(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    if (payMoney >= price)
    {
        let s = 0;
        let change = payMoney - price;
        moneyArr.forEach(e => {
            s += parseInt(document.getElementById(e + "yen").textContent);
            while(e <= change)
            {
                change -= e;
                s++;
            }
        });
        score.textContent = s;

        if (s == 7) clearEvt();
    }
}

function reset(evt)
{
    evt.preventDefault();
    evt.target.setAttribute("fill", "#AAAAAA");
    moneyArr.forEach(e => {
        document.getElementById(e + "yen").textContent = 0;
    });
    payMoney = 0;
    enterGreen.setAttribute("fill-opacity", 0); 
    score.textContent = "-";
}
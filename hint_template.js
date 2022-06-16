addText(svg, contentName, ["x", 450, "y", 180, "font-size", 100, "font-family", "Yu Gothic Medium"]);
addText(svg, "ヒント・解説", ["x", 450, "y", 240, "font-size", 50, "font-family", "Yu Gothic Medium"]);

addButton("rect", ["x", 250, "y", 350, "width", 400, "height", 200, "stroke", "black", "stroke-width", 5, "ontouchstart", "select(evt)", "onclick", "showHint(0)"]);
addText(svg, "ヒント1", ["x", 450, "y", 480, "font-size", 70, "text-anchor", "middle",
    "font-family", "Yu Gothic Medium", "pointer-events", "none"]);

addButton("rect", ["x", 250, "y", 600, "width", 400, "height", 200, "stroke", "black", "stroke-width", 5, "ontouchstart", "select(evt)", "onclick", "showHint(1)"]);
addText(svg, "ヒント2", ["x", 450, "y", 730, "font-size", 70, "text-anchor", "middle",
    "font-family", "Yu Gothic Medium", "pointer-events", "none"]);

addButton("rect", ["x", 250, "y", 850, "width", 400, "height", 200, "stroke", "black", "stroke-width", 5, "ontouchstart", "select(evt)", "onclick", "showHint(2)"]);
addText(svg, "解説", ["x", 450, "y", 980, "font-size", 70, "text-anchor", "middle",
    "font-family", "Yu Gothic Medium", "pointer-events", "none"]);

addButton("rect", ["x", 250, "y", 1200, "width", 400, "height", 100, "stroke", "black", "stroke-width", 5, "ontouchstart", "select(evt)", "onclick", "toQuestion()"]);
addText(svg, "問題に戻る", ["x", 450, "y", 1263, "font-size", 40, "text-anchor", "middle",
    "font-family", "Yu Gothic Medium", "pointer-events", "none"]);

const hintObj = addObj(svg, "g", ["display", "none"]);
addObj(hintObj, "rect", ["x", 100, "y", 300, "width", 700, "height", 1200, "fill", "white", "stroke", "black", "stroke-width", 5]);
hintObj.appendChild(addButton("rect", ["x", 700, "y", 300, "width", 100, "height", 100, "fill", "#EEEEEE", "stroke", "black", "stroke-width", 3, "ontouchstart", "select(evt)", "onclick", "closeHint()"]));
addObj(hintObj, "line", ["x1", 720, "y1", 320, "x2", 780, "y2", 380, "stroke", "black", "stroke-width", 5, "pointer-events", "none"]);
addObj(hintObj, "line", ["x1", 780, "y1", 320, "x2", 720, "y2", 380, "stroke", "black", "stroke-width", 5, "pointer-events", "none"]);

const hintTextObj = [];

for (let i=0; i<3; i++)
{
    hintTextObj.push(addObj(hintObj, "g", ["display", "none"]));
    const dy = 70;
    const yStart = 950 - hintText[i].length * dy / 2;
    for (let j=0; j<hintText[i].length; j++)
    {
        addText(hintTextObj[i], hintText[i][j], ["x", 450, "y", yStart + dy * j, "font-size", 45, "text-anchor", "middle",
        "font-family", "Yu Gothic Medium", "pointer-events", "none"]);
    }
}


const select = (event) => {
    event.target.setAttribute("fill", "#AAAAAA");
}

const showHint = (hintNum) => {
    hintObj.setAttribute("display", "inline");
    hintTextObj[hintNum].setAttribute("display", "inline");
}

const closeHint = (hintNum) => {
    hintObj.setAttribute("display", "none");
    hintTextObj.forEach(e => e.setAttribute("display", "none"));
}

const toQuestion = () => {
    window.location.href = contentName + ".html";
}
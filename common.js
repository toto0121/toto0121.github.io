addButton("rect", ["x", 50, "y", 50, "width", 250, "height", 100, "stroke", "black", "ontouchstart", "toHome()"]);
addText(svg, "とと謎一覧へ",["x",175, "y", 120, "font-size", 40, "pointer-events", "none"]);

const toHome = () => {
    window.location.href = "nazo_index.html";
}

addButton("rect", ["x", 50, "y", 180, "width", 250, "height", 100, "stroke", "black","ontouchstart", "toHint()"]);
addText(svg, "ヒント・解説",["x",175, "y", 250, "font-size", 40, "pointer-events", "none"]);

const toHint = () => {
    window.location.href = contentName + "_hint.html";
}
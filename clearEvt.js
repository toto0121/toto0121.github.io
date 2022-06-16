function clearEvt()
{
    clearObj = addObj(svg, "g", ["transform", "translate(0,200)"]);
    addObj(clearObj, "rect", ["x", 100, "y", 150, "width", 700, "height", 900, "fill", "white", "stroke", "black", "stroke-width", 5, "opacity", 0.9])
    addObj(clearObj, "rect", ["x", 700, "y", 150, "width", 100, "height", 100, "fill", "#DDDDDD", "stroke", "black", "stroke-width", 3, "onclick", "closeClear(0)", "ontouchstart", "closeClear(1)"]);
    addObj(clearObj, "line", ["x1", 720, "y1", 170, "x2", 780, "y2", 230, "stroke", "black", "stroke-width", 3, "pointer-events", "none"]);
    addObj(clearObj, "line", ["x1", 720, "y1", 230, "x2", 780, "y2", 170, "stroke", "black", "stroke-width", 3, "pointer-events", "none"]);
    addText(clearObj, "Congratulations!", ["fill", "red", "x", 450, "y", 400, "font-size", 80, "font-weight", "bold"]);
    addObj(clearObj, "rect", ["x", 350, "y",450, "width", 200, "height", 80, "rx", 5, "ry", 5, "fill", "#00BFFF", "onclick", "tweet()"]);
    addObj(clearObj, "path", ["pointer-events", "none", "fill","#FFFFFF","transform","translate(340,450) scale(0.2)","d","M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23"]);
    addText(clearObj, "TWEET", ["x", 470, "y", 503, "fill", "white", "font-family", "Arial", "font-size", 35])
    addText(clearObj, "謎は解けましたか？", ["x", 450, "y", 700, "font-size", 60,"font-family", "Yu-Gothic"]);
    addText(clearObj, "詳しい解説は", ["x", 450, "y", 820, "font-size", 60,"font-family", "Yu-Gothic"]);
    addText(clearObj, "左上のボタンから！", ["x", 450, "y", 900, "font-size", 60,"font-family", "Yu-Gothic"]);
}

function closeClear(n)
{
    if ("ontouchstart" in window && n == 0) return;
    clearObj.setAttribute("display", "none");
}

function tweet()
{
    var EUC = encodeURIComponent;
    var twitter_url = "http://twitter.com/intent/tweet?text=";
    
    var message = "web謎解き " + contentName  + " の謎を解き明かした！";

    message += URL + "\n\n#web謎解き #とと謎" + contentName + " #とと謎";

    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
        location.href = 'https://twitter.com/intent/tweet?text=' + EUC(message);
    }else{
        window.open(twitter_url + EUC(message), "_blank","top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
    }
}
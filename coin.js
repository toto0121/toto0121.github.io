const contentObj = allInfo.coin;

const coinWidth = [0.068, 0.077, 0.042, 0.068];

function init()
{
    for (let i=0; i<12; i++)
    {
        offCoin(event, i);
    }
}

function createFramedText(str, posx, posy, wid, hei, top, left)
{
    let frame = document.createElement("div");
    frame.style.width = wid * width;
    frame.style.height = hei * width;
    frame.style.left = posx * width;
    frame.style.top = posy * width;
    //frame.style.border = width * 0.003 + "px solid black";
    frame.classList.add("coinFrame");
    let text = document.createElement("p");
    text.innerText = str;
    text.style.fontSize = width * 0.1;
    text.style.top = top * width;
    text.style.left = left * width;
    text.classList.add("coinText");
    frame.appendChild(text);
    camera.appendChild(frame);
    textObjs.push(frame);
}

function getLength(str, option)
{
    let s = 0;
    for (let i=0; i<str.length; i++)
    {
        if (str[i] == 'C') s += coinWidth[0];
        if (str[i] == 'O') s += coinWidth[1];
        if (str[i] == 'I') s += coinWidth[2];
        if (str[i] == 'N') s += coinWidth[3];
        if (option != 1) checkList[str[i]]++;
    }
    let t = 0;
    for (let i=0; i<str.length / 2.0; i++)
    {
        if (str[i] == 'C') t += coinWidth[0];
        if (str[i] == 'O') t += coinWidth[1];
        if (str[i] == 'I') t += coinWidth[2];
        if (str[i] == 'N') t += coinWidth[3];
        if (option == 1) checkList[str[i]]++;
        else if (option == 2) checkList[str[i]]--;
    }
    if (str.length % 2 == 1) 
    {
        if (str[(str.length-1) / 2] == 'C') t -= coinWidth[0] / 2;
        if (str[(str.length-1) / 2] == 'O') t -= coinWidth[1] / 2;
        if (str[(str.length-1) / 2] == 'I') t -= coinWidth[2] / 2;
        if (str[(str.length-1) / 2] == 'N') t -= coinWidth[3] / 2;
        if(option > 0) checkList[str[(str.length-1) / 2]] = -100;
    }
    
    if (option == 0) return s;
    if (option == 1) return t;
    if (option == 2) return s - t;
}

let textObjs = [];

function decode()
{
    let str = "";
    for (let i=0; i<12; i++)
    {
        if (onCoins[i].on)
        {
            if (i%4 == 0) str += "C";
            else if (i%4 == 1) str += "O";
            else if (i%4 == 2) str += "I";
            else if (i%4 == 3) str += "N";
        }
    }

    textObjs.forEach(e => {camera.removeChild(e);})
    textObjs.length = 0;

    let buf = str.split("IN");
    let  l = buf.length;
    if (buf.length > 1)
    {
        for (let i=buf.length-1; i>=0; i--)
        {
            if (buf[i] == "")
            {
                if (i > 0)
                {
                    buf.length--;
                    buf[buf.length-1] += "IN"
                }
                else if (buf.length == 1)
                {
                    buf[0] = "IN";
                }
                else
                {
                    buf.shift();
                    buf[0] = "IN" + buf[0];
                }
            }
        }
    }
    
    
    if (buf.length == 3)
    {
        //buf[0] IN buf[1] IN buf[2]
        let len1 = getLength(buf[0], 0);
        let len2 = getLength(buf[1], 1);
        let len3 = getLength(buf[1], 2);
        let len4 = getLength(buf[2], 1);
        let len5 = getLength(buf[2], 2);
        createFramedText(buf[2], 0.5-(len1+len2+len3+len4+len5)/2, 0.45, len4, 0.09, -0.12, 0);
        createFramedText(buf[1], 0.5-(len1+len2+len3-len4+len5)/2, 0.45, len2, 0.09, -0.12, 0);
        createFramedText(buf[0], 0.5-(len1-len2+len3-len4+len5)/2, 0.45, len1, 0.09, -0.12, 0);
        createFramedText(buf[1], 0.5-(-len1-len2+len3-len4+len5)/2, 0.45, len3, 0.09, -0.12, -len2);
        createFramedText(buf[2], 0.5-(-len1-len2-len3-len4+len5)/2, 0.45, len5, 0.09, -0.12, -len4);
    }
    else if (buf.length == 2)
    {
        let buf1 = buf[0].split("ON");
        if (buf1.length > 1)
        {
            for (let i=buf1.length-1; i>=0; i--)
            {
                if (buf1[i] == "")
                {
                    if (i > 0)
                    {
                        buf1.length--;
                        buf1[buf1.length-1] += "ON"
                    }
                    else if (buf1.length == 1)
                    {
                        buf1[0] = "IN";
                    }
                    else
                    {
                        buf1.shift();
                        buf1[0] = "IN" + buf1[0];
                    }
                }
            }
        }
        
        if (buf1.length == 2)
        {
            //buf1[0] ON buf1[1] IN buf[1]
            let len1 = getLength(buf1[0], 0);
            createFramedText(buf1[0], (0.5 - len1/2), 0.4, len1, 0.09, -0.12, 0);
            let len2 = getLength(buf1[1], 0);
            let len3 = getLength(buf[1], 1);
            let len4 = getLength(buf[1], 2);
            createFramedText(buf[1], 0.5-(len2+len3+len4)/2, 0.5, len3, 0.09, -0.12, 0);
            createFramedText(buf1[1], 0.5-(len2-len3+len4)/2, 0.5, len2, 0.09, -0.12, 0);
            createFramedText(buf[1], 0.5-(-len2-len3+len4)/2, 0.5, len4, 0.09, -0.12, -len3);
        }
        else
        {
            let buf2 = buf[1].split("ON");
            if (buf2[buf2.length - 1] == "")
            {
                buf2.length--;
                buf2[buf2.length-1] += "ON"
            }
            if (buf2.length == 2)
            {
                //buf[0] IN buf2[0] ON buf2[1]
                let len1 = getLength(buf[0],0);
                let len2 = getLength(buf2[0], 1);
                let len3 = getLength(buf2[0], 2);
                let len4 = getLength(buf2[1], 1);
                let len5 = getLength(buf2[1], 2);
                createFramedText(buf[0], 0.5-len1/2, 0.45, len1, 0.09, -0.12, 0);
                createFramedText(buf2[0], 0.5-len1/2-len2, 0.4, len2, 0.09, -0.12, 0);
                createFramedText(buf2[0], 0.5+len1/2, 0.4, len3, 0.09, -0.12, -len2);
                createFramedText(buf2[1], 0.5-len1/2-len4, 0.5, len4, 0.09, -0.12, 0);
                createFramedText(buf2[1], 0.5+len1/2, 0.5, len5, 0.09, -0.12, -len4);
            }
            else if (buf2.length == 1)
            {
                //buf[0] IN buf[1]
                let len1 = getLength(buf[0], 0);
                let len2 = getLength(buf[1], 1);
                let len3 = getLength(buf[1], 2);
                createFramedText(buf[0], 0.5-(len1-len2+len3)/2, 0.45, len1, 0.09, -0.12, 0);
                createFramedText(buf[1], 0.5-(len1+len2+len3)/2, 0.45, len2, 0.09, -0.12, 0);
                createFramedText(buf[1], 0.5-(-len1-len2+len3)/2, 0.45, len3, 0.09, -0.12, -len2);
            }
        }
    }
    else if (buf.length == 1)
    {
        let buf1 = str.split("ON");
        if(buf1.length > 1)
        {
            for (let i=buf1.length-1; i>=0; i--)
            {
                if (buf1[i] == "")
                {
                    if (i > 0)
                    {
                        buf1.length--;
                        buf1[buf1.length-1] += "ON"
                    }
                    else if (buf1.length == 1)
                    {
                        buf1[0] = "IN";
                    }
                    else
                    {
                        buf1.shift();
                        buf1[0] = "IN" + buf1[0];
                    }
                }
            }
        }
        
        if (buf1.length == 3)
        {
            //buf1[0] ON buf1[1] ON buf1[2]
            let len1 = getLength(buf1[0], 0);
            let len2 = getLength(buf1[1], 0);
            let len3 = getLength(buf1[2], 0);
            createFramedText(buf1[0], 0.5-len1/2, 0.35, len1, 0.09, -0.12, 0);
            createFramedText(buf1[1], 0.5-len2/2, 0.45, len2, 0.09, -0.12, 0);
            createFramedText(buf1[2], 0.5-len3/2, 0.55, len3, 0.09, -0.12, 0);
        }
        else if (buf1.length == 2)
        {
            //buf1[0] ON buf1[1]
            let len1 = getLength(buf1[0], 0);
            let len2 = getLength(buf1[1], 0);
            createFramedText(buf1[0], 0.5-len1/2, 0.4, len1, 0.09, -0.12, 0);
            createFramedText(buf1[1], 0.5-len2/2, 0.5, len2, 0.09, -0.12, 0);
        }
        else if (buf1.length == 1)
        {
            //buf1[0]
            let len1 = getLength(buf1[0], 0);
            createFramedText(buf1[0], 0.5-len1/2, 0.45, len1, 0.09, -0.12, 0);
        }
    }

    check();
}

let onCoins = [];
for (let i=0; i<12; i++)
{
    let obj = document.createElement("img");
    obj.classList.add("coinImg");
    obj.style.width = width * 0.15;
    obj.style.top = (0.68 + 0.2 * Math.floor(i/4)) * width;
    obj.style.left = (0.2 + 0.15 * (i % 4)) * width;
    obj.src = "image/coin_off.png";
    obj.setAttribute("ontouchstart", "onCoin(event,"+i+")");
    camera.appendChild(obj);

    obj = document.createElement("img");
    obj.classList.add("coinImg");
    obj.style.width = width * 0.15;
    obj.style.top = (0.68 + 0.2 * Math.floor(i/4)) * width;
    obj.style.left = (0.2 + 0.15 * (i % 4)) * width;
    obj.style.opacity = 0;
    obj.src = "image/coin_on.png";
    obj.style.pointerEvents = "none";
    obj.setAttribute("ontouchstart", "offCoin(event,"+i+")");
    camera.appendChild(obj);
    onCoins.push(obj);
    onCoins[i].on = false;
}

function onCoin(event, id)
{
    if (event != undefined) event.preventDefault();
    onCoins[id].style.pointerEvents = "auto";
    onCoins[id].style.opacity = 1;
    onCoins[id].on = true;
    
    decode();
}

function offCoin(event, id)
{
    if (event != undefined) event.preventDefault();
    onCoins[id].style.pointerEvents = "none";
    onCoins[id].style.opacity = 0;
    onCoins[id].on = false;

    decode();
}

let checkList = {};
checkList["C"] = 0;
checkList["O"] = 0;
checkList["I"] = 0;
checkList["N"] = 0;

let checkObjs = [];

for (let i=0; i<4; i++)
{
    let str = "COIN";
    let obj = document.createElement("p");
    obj.innerText = str.slice(i, i+1);
    obj.style.fontSize = width * 0.15;
    obj.style.top = 1.2 * width;
    let l = 0.1;
    for (let j=0; j<i; j++)
    {
        l += coinWidth[j] * 1.5;
    }
    obj.style.left = l * width;
    obj.classList.add("coinText");
    obj.style.position = "absolute";
    obj.style.transition = "0.5s";
    camera.appendChild(obj);
    checkObjs.push(obj);
}

let continueButton;
let bronz = false;
let silver = false;

function check()
{
    let str = "COIN";
    let clear = true;
    for (let i=0; i<4; i++)
    {
        if (checkList[str.slice(i, i+1)] == 1)
        {
            checkObjs[i].style.color = "red";
        }
        else 
        {
            checkObjs[i].style.color = "gray";
            clear = false;
        }
        checkList[str.slice(i, i+1)] = 0;
    }
    
    if (clear)
    {
        let coinCount = 0;
        for (let i=0; i<12; i++)
        {
            if (onCoins[i].on)
            {
                coinCount++;
            }
        }
        if (coinCount == 8) clearEvt();
        else if ((coinCount == 4 && !bronz) || coinCount == 6 && !silver)
        {
            if (coinCount == 4) bronz = true;
            else if (coinCount == 6) silver = true;

            if(clearImage != null) return;
            clearImage = document.createElement("img");
            if (coinCount == 4) clearImage.setAttribute("src", "image/clear_bronz.png");
            else if (coinCount == 6) clearImage.setAttribute("src", "image/clear_silver.png");
            clearImage.classList.add("clearImage");
            clearImage.style.top = width * 0.6;
            camera.appendChild(clearImage);
        
            tweetdiv = document.createElement("div");
            tweetdiv.style.left = width * 0.2;
            tweetdiv.style.top = width * 0.92;
            tweetdiv.style.position = "relative";
            tweetdiv.style.zIndex = 10000;
            camera.appendChild(tweetdiv);

            continueButton = document.createElement("div");
            camera.appendChild(continueButton);
            continueButton.style.top = width * 0.9;
            continueButton.style.left = width * 0.2;
            continueButton.style.zIndex = 10000;
            continueButton.setAttribute("ontouchstart","cont()");
            continueButton.classList.add("menuButton");
            let continueButtonText = document.createElement("p");
            continueButtonText.innerText = "CONTINUE";
            continueButtonText.classList.add("menuButtonText");
            continueButton.appendChild(continueButtonText);
        
            let tweetImage = document.createElement("img");
            tweetImage.setAttribute("src", "image/tweet.png");
            tweetImage.setAttribute("ontouchstart", "tweetNC(" + coinCount + ")");
            tweetImage.classList.add("tweetImage");
            tweetdiv.appendChild(tweetImage);           
        }
    }
}

resetButton.style.top = width * 1.4;
resetButton.style.left = width * 0.6;

function reset()
{
    resetButton.style.backgroundColor = "#AAAAAA";
    init();
    if (clearImage != null)
    {
        clearImage.remove();
        tweetdiv.remove();
        clearImage = null;
    }
    if (continueButton != null)
    {
        continueButton.remove();
        continueButton = null;
    }
}

function cont()
{
    continueButton.style.backgroundColor = "#AAAAAA";
    if (clearImage != null)
    {
        clearImage.remove();
        tweetdiv.remove();
        clearImage = null;
    }
    if (continueButton != null)
    {
        continueButton.remove();
        continueButton = null;
    }
}

function tweetNC(count)
{
    var EUC = encodeURIComponent;
    var twitter_url = "http://twitter.com/intent/tweet?text=";
    const URL = "https://toto0121.github.io/" + contentObj.name + ".html"
    var message = contentObj.name  + "の謎を解き明かした...?\n\n獲得コイン: " + count +"枚";

    if (contentObj != undefined) message += "難易度 " + contentObj.difficulty[0] + "\n";
    message += "#web謎解き #とと謎" + contentObj.name + " #とと謎\n" + URL;

    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
        location.href = 'https://twitter.com/intent/tweet?text=' + EUC(message);
    }else{
        window.open(twitter_url + EUC(message), "_blank","top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
    }
}

function tweet()
{
    var EUC = encodeURIComponent;
    var twitter_url = "http://twitter.com/intent/tweet?text=";
    const URL = "https://toto0121.github.io/" + contentObj.name + ".html"
    var message = "見事" + contentObj.name  + "の謎を解き明かした！\n\n獲得コイン: ?枚";

    if (contentObj != undefined) message += "難易度 " + contentObj.difficulty[0] + "\n";
    message += "#web謎解き #とと謎" + contentObj.name + " #とと謎\n" + URL;

    if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
        location.href = 'https://twitter.com/intent/tweet?text=' + EUC(message);
    }else{
        window.open(twitter_url + EUC(message), "_blank","top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
    }
}

init();


const contentName = "heart";
const contentDate = "2022年10月1日";

const cards = new Array(11);
const cardsBack = new Array(11);
let cardsAngle = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let backPath = ["O","X","X","X","W","X","X","H","X","X","X"];
const backCode = "ONETWOTHREE";
const frontCode = "AAA22233333";
const heart = new Array(5);
let str = "";
let step = 0;
let clearImage;
let tweetdiv;

let camera = document.createElement("div");
camera.setAttribute("style", "transform:perspective(800px); transform-style: preserve-3d; width: 100%; height: 100%;")
document.body.appendChild(camera);

let menuButton = document.createElement("div");
camera.appendChild(menuButton);
menuButton.setAttribute("style","top:1%;");
menuButton.setAttribute("onmousedown","toHome()");
menuButton.classList.add("menuButton");
let menuButtonText = document.createElement("p");
menuButtonText.innerText = "とと謎一覧へ";
menuButtonText.classList.add("menuButtonText");
menuButton.appendChild(menuButtonText);

let hintButton = document.createElement("div");
camera.appendChild(hintButton);
hintButton.setAttribute("style","top:9%;");
hintButton.setAttribute("onmousedown","toHint()");
hintButton.classList.add("menuButton");
let hintButtonText = document.createElement("p");
hintButtonText.innerText = "ヒント・解説";
hintButtonText.classList.add("menuButtonText");
hintButton.appendChild(hintButtonText);

let infoText = document.createElement("div");
infoText.innerText = "web謎解き " + contentName + " " + contentDate + "公開\n制作 とと (@to_to_0121)\n#とと謎　#とと謎" + contentName;
infoText.classList.add("info");
camera.appendChild(infoText);

let heartText = new Array(5);
const heartVal = "HEART";
let heartTextObj = document.createElement("div");
heartTextObj.classList.add("heartText");
camera.appendChild(heartTextObj);
for (let i=0; i<5; i++)
{
    heartText[i] = document.createElement("span");
    heartText[i].innerText = heartVal[i];
    heartTextObj.appendChild(heartText[i]);
}

let cardWidth = 13;
let cardSpaceX = 16;
for (let i=0; i<11; i++) 
{
    cards[i] = document.createElement("img");
    cards[i].classList.add("card");
    if (i < 3) setAttributes(cards[i],["style", "left: "+(cardSpaceX * (i - 1) + 50 - cardWidth / 2)+"%; top: 35%; width:"+cardWidth+"%;","onclick","flip("+i+")","src", "image/card1.png"]);
    else if (i < 6) setAttributes(cards[i],["style", "left: "+(cardSpaceX * (i - 4) + 50 - cardWidth / 2)+"%; top: 50%; width:"+cardWidth+"%;","onclick","flip("+i+")","src", "image/card2.png"]);
    else setAttributes(cards[i],["style", "left: "+(cardSpaceX * (i - 8) + 50 - cardWidth / 2)+"%; top: 65%; width:"+cardWidth+"%;","onclick","flip("+i+")","src", "image/card3.png"]);
    
    cardsBack[i] = document.createElement("img");
    cardsBack[i].classList.add("card");
    if (i < 3) setAttributes(cardsBack[i],["style", "left: "+(cardSpaceX * (i - 1) + 50 - cardWidth / 2)+"%; top: 35%; width:"+cardWidth+"%;","onclick","flip("+i+")","src", "image/" + backPath[i] + ".png"]);
    else if (i < 6) setAttributes(cardsBack[i],["style", "left: "+(cardSpaceX * (i - 4) + 50 - cardWidth / 2)+"%; top: 50%; width:"+cardWidth+"%;","onclick","flip("+i+")","src", "image/" + backPath[i] + ".png"]);
    else setAttributes(cardsBack[i],["style", "left: "+(cardSpaceX * (i - 8) + 50 - cardWidth / 2)+"%; top: 65%; width:"+cardWidth+"%;","onclick","flip("+i+")","src", "image/" + backPath[i] + ".png"]);
    cardsBack[i].style.transform = "rotateY(180deg)";

    camera.appendChild(cards[i]);
    camera.appendChild(cardsBack[i]);
}

let resetBtn = document.createElement("div");
resetBtn.setAttribute("ontouchstart", "reset()");
resetBtn.setAttribute("ontouchend", "release_btn(event)");
resetBtn.classList.add("menuButton");
resetBtn.style.top = "81%";
resetBtn.style.left = "37.5%";
camera.appendChild(resetBtn);

let resetBtnText = document.createElement("p");
resetBtnText.innerText = "RESET";
resetBtnText.classList.add("menuButtonText");
resetBtn.appendChild(resetBtnText);

function flip(id)
{
    if (step >= 5) return; 
    let c;
    if (cardsAngle[id] == 0) c = backCode[id];
    else c = frontCode[id];
    flipAnimation(id);
    
    if (c == heartVal[step])
    {
        heartText[step].style.color = "#FF0000";
    }
    else
    {
        heartText[step].style.color = "#AAAAAA";
    }
    str += c;
    step++; 
    if (step < 5) 
    {
        
    }
    else
    {
        if (str == "HEART") 
        {
            clearEvt();
        }
        else shakeAnimation();
    }
}

function flipAnimation(id)
{
    cardsAngle[id] += 3;
    cards[id].style.transform = "rotateY(" + cardsAngle[id] + "deg)";
    cardsBack[id].style.transform = "rotateY(" + (180+cardsAngle[id]) + "deg)";
    if (cardsAngle[id] % 180 == 0) 
    {
        if (cardsAngle[id] == 360) cardsAngle[id] = 0;
        return;
    }
    
    window.setTimeout(() => {flipAnimation(id);}, 10);
}

let theta = 0;

function shakeAnimation()
{
    theta += 12;
    heartTextObj.style.transform = "translateX(" + (30 * Math.sin(theta / 180 * Math.PI)) + "px)";
    if (theta == 360)
    {
        theta = 0;
    }
    else
    {
        window.setTimeout(shakeAnimation, 10);
    }
}

function clearEvt()
{
    clearImage = document.createElement("img");
    clearImage.setAttribute("src", "image/clear.png");
    clearImage.classList.add("clearImage");
    camera.appendChild(clearImage);

    tweetdiv = document.createElement("div");
    tweetdiv.style.textAlign = "center";
    tweetdiv.style.marginTop = "77%";
    tweetdiv.style.position = "relative";
    tweetdiv.style.transform = "translateZ(110px)";
    camera.appendChild(tweetdiv);

    let twtTxt = "見事" + contentName + "の謎を解き明かした！%0a%0a#web謎解き #とと謎" + contentName + " #とと謎%0a" + "https://toto0121.github.io/" + contentName + ".html";
    /*
    tweetdiv.innerHTML = '<iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" '+
    'class="twitter-share-button-rendered twitter-tweet-button" data-url="a" style="position: static; visibility: visible;' + 
    'width: 81px; height: 28px; transform: scale(2);" title="Twitter Tweet Button" src="https://platform.twitter.com/widgets/tweet_button.7dae38096d06923d683a2a807172322a.ja.html&amp;text=' + twtTxt + '&amp;url="></iframe>';
    */
    //tweetdiv.innerHTML = '<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
}

function reset()
{
    resetBtn.style.backgroundColor = "#AAAAAA";
    step = 0;
    for (let i=0; i<11; i++)
    {
        if (cardsAngle[i] == 180) flip(i);
        step = 0;
    }
    
    for (let i=0; i<5; i++)
    {
        heartText[i].style.color = "black";
    }

    str = "";

    if (clearImage != null)
    {
        clearImage.remove();
        tweetdiv.remove();
    }
}

function toHint()
{
    hintButton.style.backgroundColor = "#AAAAAA";
    window.location.href = contentName + "_hint.html";
}

const toHome = () => {
    menuButton.style.backgroundColor = "#AAAAAA";
    window.location.href = "nazo_index.html";
}

function release_btn(event)
{
    event.target.style.backgroundColor = "#DDDDDD";
}

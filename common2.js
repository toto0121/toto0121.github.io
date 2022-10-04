function toHint()
{
    hintButton.style.backgroundColor = "#AAAAAA";
    window.location.href = contentName + "_hint.html";
}

const toHome = () => {
    menuButton.style.backgroundColor = "#AAAAAA";
    window.location.href = "nazo_index.html";
}
let camera = document.createElement("div");
    camera.setAttribute("style", "position: static;")
    document.body.appendChild(camera);

let menuButton = document.createElement("div");
camera.appendChild(menuButton);
menuButton.setAttribute("style","top:1%;");
menuButton.setAttribute("ontouchstart","toHome()");
menuButton.classList.add("menuButton");
let menuButtonText = document.createElement("p");
menuButtonText.innerText = "とと謎一覧へ";
menuButtonText.classList.add("menuButtonText");
menuButton.appendChild(menuButtonText);

let hintButton = document.createElement("div");
camera.appendChild(hintButton);
hintButton.setAttribute("style","top:9%;");
hintButton.setAttribute("ontouchstart","toHint()");
hintButton.classList.add("menuButton");
let hintButtonText = document.createElement("p");
hintButtonText.innerText = "ヒント・解説";
hintButtonText.classList.add("menuButtonText");
hintButton.appendChild(hintButtonText);

window.onload = () => {
    let infoText = document.createElement("div");
    infoText.innerText = "web謎解き " + contentName + " " + contentDate + "公開\n制作 とと (@to_to_0121)\n#とと謎　#とと謎" + contentName;
    infoText.classList.add("info");
    camera.appendChild(infoText);
};


let resetButton = document.createElement("div");
camera.appendChild(resetButton);
resetButton.setAttribute("ontouchstart","reset()");
resetButton.setAttribute("ontouchend", "release_btn(event)");
resetButton.classList.add("menuButton");
let resetButtonText = document.createElement("p");
resetButtonText.innerText = "RESET";
resetButtonText.classList.add("menuButtonText");
resetButton.appendChild(resetButtonText);

let clearImage;
let tweetdiv;

function clearEvt()
{
    clearImage = document.createElement("img");
    clearImage.setAttribute("src", "image/clear.png");
    clearImage.classList.add("clearImage");
    camera.appendChild(clearImage);

    tweetdiv = document.createElement("div");
    tweetdiv.style.textAlign = "center";
    tweetdiv.style.top = width * 0.92;
    tweetdiv.style.position = "relative";
    tweetdiv.style.zIndex = 1;
    camera.appendChild(tweetdiv);

    let tweetImage = document.createElement("img");
    tweetImage.setAttribute("src", "image/tweet.png");
    tweetImage.setAttribute("ontouchstart", "tweet()");
    tweetImage.classList.add("tweetImage");
    tweetdiv.appendChild(tweetImage);
    //let twtTxt = "見事" + contentName + "の謎を解き明かした！%0a%0a#web謎解き #とと謎" + contentName + " #とと謎%0a" + "https://toto0121.github.io/" + contentName + ".html";
}

function release_btn(event)
{
    console.log("release");
    event.target.style.backgroundColor = "#DDDDDD";
}
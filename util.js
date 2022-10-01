function setAttributes(obj, cmd) {
    let len = cmd.length;
    let i=0;
    while (i+1 < len)
    {
        obj.setAttribute(cmd[i], cmd[i+1]);
        i += 2;
    }
}

function addObj(parent, objtype, cmd) {
    let obj = document.createElementNS('http://www.w3.org/2000/svg',objtype);
    setAttributes(obj, cmd);
    parent.appendChild(obj);
    return obj;
}

function addText(parent, text, cmd)
{
    let obj = document.createElementNS('http://www.w3.org/2000/svg',"text");
    setAttributes(obj, ["font-size", 200, "font-family", "‘Noto Serif JP’, serif", "fill", "black", "stroke", "none", "text-anchor", "middle", "pointer-events", "none", "style", "user-select:none; -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none;"]);
    setAttributes(obj, cmd);
    obj.textContent = text;
    parent.appendChild(obj);
    return obj;
}

function addImageObj(parent, cmd, path) {
    const obj = addObj(parent, "image", cmd);
    obj.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", path);
    return obj;
}

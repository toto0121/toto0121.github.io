const allBtn = [];

function addButton(type, cmd)
{
    const obj = addObj(svg, type, cmd);
    obj.setAttribute("fill", "#DDDDDD");
    allBtn.push(obj);
    return obj;
}

function release_btn()
{
    allBtn.forEach(e => 
    {
        e.setAttribute("fill", "#DDDDDD");
    });
}

svg.addEventListener("touchend", function(e) {
    release_btn(); 
});
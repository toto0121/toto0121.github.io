const infoText = addText(svg, "", ["x","880","y","50","text-anchor","end",
"font-size","20","fill","black","style",
"user-select:none; -webkit-user-select:none;-moz-user-select:none; -ms-user-select:none;"]);

addObj(infoText, "tspan", ["x","880","dy","0"]).textContent = "web謎解き " + contentName + " " + contentDate + "公開";
addObj(infoText, "tspan", ["x","880","dy","30"]).textContent = "制作 とと (@to_to_0121)";
addObj(infoText, "tspan", ["x","880","dy","30"]).textContent = "#とと謎　#とと謎" + contentName;
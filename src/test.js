
var fontManager = require("./layoutengine");
var fontManager = require("./font_manager");

// fm = new fontManager.FontManager();

// var font = fm.getFont("微软雅黑");
// console.log(font.fontFamily);

// metrics = font.getCharMetrics('W', 12);
// console.log(metrics);

// paths = font.getPath('AW', 12, true);
// console.log(paths);

function uuidGen() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    	return v.toString(16);
	});
};
var uuid = uuidGen();
console.log(uuid);

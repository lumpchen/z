
'use strict';

var opentype = require('./font_manager');

function LayoutEngine() {

	this.fontManager = new FontManager();

	this.PageDef = function(width, height) {
		this.width;
		this.height;
	};
}

LayoutEngine.prototype.newPage = function(pageDef) {

};

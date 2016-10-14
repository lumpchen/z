
'use strict';

var opentype = require('./font_manager');
var linkedList = require('./linked-list');
var linkedList = require('./lib/matrix');

function Document() {

	this.pageSequenceList = new LinkedList();

	this.lineContainerMap = {}; // id : node

	this.ContentNode = function(nodeType) {
		this.NodeType = {
			Paragraph : 0, 
			Table : 1
		};
		this.nodeType = nodeType;
		this.contentLineList = [];

		this.appendLine = function(contentLine) {
			this.contentLineList.push(contentLine);
		};

		this.insertLine = function(whereLine, newLine) {
			var index = this.contentLineList.index(whereLine);
			this.contentLineList.splice(index, 1, newLine);
		};

		this.deleteLine = function(contentLine) {
			var index = this.contentLineList.indexOf(contentLine);
			this.contentLineList.splice(index, 1);
		};
	};
}
Document.prototype.newPageSequence = function(sectionDef) {
};

Document.prototype.newParagraph = function() {
	var uuid = uuidGen();
	p = new this.ContentNode(this.ContentNode.NodeType.Paragraph);
	this.lineContainerMap = {uuid, p};
};

Document.prototype.newPage = function() {

};

function StyledSheet() {
	this.sectionDefMap = {};
	this.paragraphStyleMap = {};

	this.SectionDef = function() {
		this.width;
		this.height;
		this.margin;
		this.headerMargin;
		this.footerMargin;
	};

	this.ParagraphStyle = function() {
		this.margin;
		this.lineHeight;
		this.fontFamily;
		this.fontSize;

		this.calcLineHeight = function() {
			return 0;
		};
	};
}
StyledSheet.prototype.addSectionDef = function(name, def) {
	this.sectionDefMap[name] = def;
};
StyledSheet.prototype.getSectionDef = function(name) {
	return this.sectionDefMap[name];
};
StyledSheet.prototype.addParaStyle = function(name, style) {
	this.paragraphStyleMap[name] = style;
};
StyledSheet.prototype.getParaStyle = function(name) {
	return this.paragraphStyleMap[name];
};


function PageSequence(document, sectionDef) {

	this.document = document;
	this.sectionDef = sectionDef;
	this.pageList;
}
PageSequence.prototype.newPage = function(sectionDef) {
	var page = new Page(this.document, sectionDef);
};


function Page(document, pageDef) {

	this.document = document;

	this.width = pageDef.width;
	this.height = pageDef.height;

	this.margin = pageDef.margin;

	this.headerFrame;
	this.bodyFrame;
	this.footerFrame;
}
Page.prototype.constructFrame = function() {

};

function Frame(document, width, height, matrix) {

	this.document = document;

	this.width = width;
	this.height = height;
	this.matrix = matrix;
	
	this.contentBoxList = [];
}
Frame.prototype.locate = function(point) {
	if (this.contentBoxList.length === 0) {
		var m = new Matrix();

	}
};
Frame.prototype.newContentBox = function() {
	var m = new Matrix();
	var lineHeight = this.getCurrentParaStyle().calcLineHeight();
	var newContentBox = new ContentBox(this.width, lineHeight, m);
	return newContentBox;
};
Frame.prototype.appendContentBox = function() {
	if (this.contentBoxList.length === 0) {
		var m = new Matrix();
		var lineHeight = this.getCurrentParaStyle().calcLineHeight();
		var newContentBox = new ContentBox(this.width, lineHeight, m);
		this.contentBoxList.push(newContentBox);
		return;
	}

};
Frame.prototype.getCurrentParaStyle = function() {
	return null; // current paragraph style
};


function ContentBox(width, height, matrix) {

	this.width = width;
	this.height = height;
	this.matrix = matrix;
	this.contentLineList;
}
ContentBox.prototype.newLine = function() {

};

function ContentLine(width, height, matrix, containerID, parentBox) {

	this.uuid = containerID;
	this.parent = parent;

	this.width = width;
	this.height = height;
	this.matrix = matrix;
	this.contentRunList;
}
ContentLine.prototype.getContainerID = function() {
	return this.uuid;
};


function ContentRun() {

}


function Box(width, height, matrix) {
	
	this.width = width;
	this.height = height;
	this.matrix = matrix;
}
Box.prototype.grow = function(lineHeight) {

};


function Point(x, y) {
	this.x = x;
	this.y = y;
};

function uuidGen() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    	var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    	return v.toString(16);
	});
};
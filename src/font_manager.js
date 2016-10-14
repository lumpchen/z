
'use strict';

var opentype = require('./lib/opentype');

function FontManager() {
	this.fontCache = {};
	this.fontLoader = new FontLoader();

	this.loadDefault();
}

FontManager.prototype.loadDefault = function() {
	var url = './fonts/msyh.ttf';
	// var cache = this.fontCache;
	// var font = this.fontLoader.load(url, function(font) {
	// 	if (font) {
	// 		console.log(font.fontFamily + " loaded");
	// 		cache[font.fontFamily] = font;				
	// 	}
	// });

	var font = this.fontLoader.loadSync(url);
	if (font) {
		this.fontCache[font.fontFamily] = font;
	}
	// if (font == null) {
	// 	alert('Font could not be loaded: ' + err);
	// 	return;
	// }

};

FontManager.prototype.getFont = function(fontFamily) {
	console.log(this.fontCache);
	return this.fontCache[fontFamily];
};


function FontLoader() {
}

FontLoader.prototype.loadSync = function(url) {
	var font = opentype.loadSync(url);
	return new Font(font);
};

FontLoader.prototype.load = function(url, callback) {
	
	opentype.load(url, function(err, font) {
		console.log("opentype loading");
		if (err) {
			alert("Font" + url +"could not be loaded: " + err);
		} else {
			callback(new Font(font));
		}
	});
};

function Font(opentypeFont) {

	this.opentypeFont = opentypeFont;

	this.GlyphMetrics = function(font, fontSize, glyph) {
        var scale = 1 / font.unitsPerEm * fontSize;

        this.xMin = glyph.xMin * scale;
        this.xMax = glyph.xMax * scale;
        this.yMin = glyph.yMin * scale;
        this.yMax = glyph.yMax * scale;
        this.advance = glyph.advanceWidth * scale;
    };
	
	this.fontFamily = this.opentypeFont.names.fontFamily.zh;
	if (typeof this.fontFamily === 'undefined') {
		this.fontFamily = this.opentypeFont.names.fontFamily.en;
	}
}

Font.prototype.getCharMetrics = function(char, fontSize) {
    var gid = this.opentypeFont.charToGlyphIndex(char);

    if (gid > 0) {
        var glyph = this.opentypeFont.glyphs.get(gid);
        return new this.GlyphMetrics(this.opentypeFont, fontSize, glyph);
    }
    return null;
};

Font.prototype.getPath = function(string, fontSize, kerning) {
	var textPath = this.opentypeFont.getPath(string, 0, 0, fontSize, {kerning : kerning});
	return textPath;
};

exports.FontManager = FontManager;
exports.FontLoader = FontLoader;
exports.Font = Font;

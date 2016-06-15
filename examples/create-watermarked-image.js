var gd = require('node-gd');
var output = '../output/image-watermark.png';

var watermark = gd.createFromPng('../input/watermark.png');
var input = gd.createFromPng('../input/input.png');

watermark.alphaBlending(1);
watermark.saveAlpha(1);

watermark.copy(input, 0, 0, 0, 0, 100, 100);

input.savePng(output, 0, function(error) {
  if (error) throw error;
});

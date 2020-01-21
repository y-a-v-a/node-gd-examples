const gd = require('node-gd');
const output = `../output/image-watermark-${Date.now()}.png`;

async function main() {
  var watermark = await gd.createFromPng('../input/watermark.png');
  var input = await gd.createFromPng('../input/input.png');

  watermark.alphaBlending(1);
  // turn on saving alpha channel of pixels (only png and gif)
  watermark.saveAlpha(1);

  // copy "watermark" to destination "input"
  watermark.copy(input, 0, 0, 0, 0, 100, 100);

  await input.savePng(output, 0);

  watermark.destroy();
  input.destroy();
}

main();

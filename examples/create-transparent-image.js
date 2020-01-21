const gd = require('node-gd');

async function main() {
  const img = await gd.createTrueColor(420, 116);

  // turn off alpha blending
  // you don't want your first filled rectangle to blend
  // with the basic black background!
  img.alphaBlending(0);

  // you *do* want to save the full alpha channel
  // i.e. I assume you want your image to be really transparent
  img.saveAlpha(1);

  // allocate any color as long as it's transparent!
  // i.e. an alpha value of 127
  const color = img.colorAllocateAlpha(255,255,255,127);
  img.filledRectangle(0,0,420,116,color);

  // turn *on* alpha blending
  // since you want the following rectangles to
  // blend with each other!
  img.alphaBlending(1);

  const transparentRed = gd.trueColorAlpha(255, 0, 0, 60);
  img.filledRectangle(10, 10, 120, 116, transparentRed);

  const transparentBlue = gd.trueColorAlpha(0, 0, 255, 60);
  img.filledRectangle(30, 30, 160, 116, transparentBlue);

  const transparentGreen = gd.trueColorAlpha(0, 255, 0, 60);
  img.filledRectangle(50, 50, 200, 116, transparentGreen);

  await img.savePng(`../output/output-${Date.now()}.png`, 0);

  img.destroy();
}

main();

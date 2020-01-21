var gd = require('node-gd');

async function main() {
  // open a source file
  const image = await gd.openJpeg('../output/hexagon.jpg');

  // read it as binary stringat quality 100
  var imgAsBinaryString = image.jpegPtr(100, true);

  // step through binary data and add some random string
  for (var i = 1025; i < imgAsBinaryString.length/2; i += Math.round(imgAsBinaryString.length / 10)) {
    imgAsBinaryString.write('!@#$%', i, 5);
  }

  try {
    // try to create a new jpeg image pointer from modified binary data
    var buffer = Buffer.from(imgAsBinaryString, 'latin1');

    var img = gd.createFromJpegPtr(buffer);

    // save it
    const success = await img.saveJpeg(`../output/glitch-${Date.now()}.jpg`, 100);
    if (!success) {
      console.log('Unable to save image');
    }
    img.destroy();
  } catch (e) {
    // console.log(e);
    console.log('Error in glitching source image.');
  }
}

main();

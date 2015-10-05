var gd = require('node-gd');
var fs = require('fs');

// name of end result
var anim = '../output/logo-anim.gif';
// source folder
var srcDir = '../input';

// read source folder
fs.readdir(srcDir, function (error, files) {
    var gifs = files.filter(function (element) {
      return element.endsWith('.gif');
    });
    gifs.sort();

    // open first frame
    gd.openGif(srcDir + '/' + gifs.shift(), function (error, img) {
      if (error) throw error;

      // create first frame
      img.gifAnimBegin(anim, -1, 0);
      img.gifAnimAdd(anim, 1, 0, 0, 50, 0, null);

      // recursively add other frames
      addGifToAnimation(gifs, img);
  });
});

/**
 * Add frame to animation or, if fileNames is empty, end animation.
 * fileNames Array
 * lastFrame gd.Image
 */
function addGifToAnimation(fileNames, lastFrame) {
  gd.openGif(srcDir + '/' + fileNames.shift(), function (error, frame) {
    if (error) throw error;

    frame.gifAnimAdd(anim, 1, 0, 0, 50, 0, lastFrame);
    if (fileNames.length === 0) {
      frame.gifAnimEnd(anim);
    } else {
      addGifToAnimation(fileNames, frame);
    }
    frame.destroy();
  });
}

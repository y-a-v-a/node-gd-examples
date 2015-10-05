var gd = require('node-gd');
var fs = require('fs');

var anim = '../output/logo-anim.gif';
var srcDir = '../input';

gd.openGif(srcDir + '/node-gd-0.gif', function (error, img) {
  if (error) throw error;

  img.gifAnimBegin(anim, -1, 0);
  img.gifAnimAdd(anim, 1, 0, 0, 50, 0, null);

  fs.readdir(srcDir, function (error, files) {
      var gifs = files.filter(function (element) {
        return element.endsWith('.gif');
      });
      gifs.shift();

      addGifToAnimation(gifs, img);
  });
});

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

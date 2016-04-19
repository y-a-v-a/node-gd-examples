var gd = require('node-gd');

// open a source file
gd.openJpeg('../output/hexagon.jpg', function (error, img) {
  if (error) throw error;

  // read it as binary stringat quality 100
  var imgAsBinaryString = img.jpegPtr(100, true);

  // step through binary data and add some random string
  for (var i = 1024; i < imgAsBinaryString.length; i += (imgAsBinaryString.length / 10)) {
    imgAsBinaryString.write('!@#$%', i, 5);
  }

  try {
    // try to create a new jpeg image pointer from modified binary data
    var buffer = imgAsBinaryString;
    var img = gd.createFromJpegPtr(buffer);

    // save it
    img.saveJpeg('../output/glitch.jpg', 100, function(error) {
      if (error) throw error;
    });
  } catch (e) {
    console.log(e);
    console.log('Error in glitching source image.');
  }
});


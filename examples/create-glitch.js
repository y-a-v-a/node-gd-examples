var gd = require('node-gd');

// open a source file
gd.openJpeg('../output/hexagon.jpg', function (error, img) {
  if (error) throw error;

  // read it as binary stringat quality 100
  var imgAsBinaryString = img.jpegPtr(100);

  // step through binary data and add some random string
  for (var i = 1024; i < imgAsBinaryString.length; i += (imgAsBinaryString.length / 10)) {
    imgAsBinaryString = imgAsBinaryString.substring(0, i) + '!@#$%' + imgAsBinaryString.substring(i);
  }

  try {
    // try to create a new jpeg image pointer from modified binary data
    var buffer = new Buffer(imgAsBinaryString, 'binary');
    var img = gd.createFromJpegPtr(buffer);

    // save it
    img.saveJpeg('../output/glitch.jpg', 100, function(error) {
      if (error) throw error;
    });
  } catch (e) {
    console.log('Error in glitching source image.');
  }
});


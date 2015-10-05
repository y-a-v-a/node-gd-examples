var gd = require('node-gd');
var anim = '../output/anim.gif';

// create first frame
var firstFrame = gd.createSync(200,200);

// allocate some colors
var whiteBackground = firstFrame.colorAllocate(255, 255, 255);
var pink = firstFrame.colorAllocate(255, 0, 255);

// create first frame and draw an ellipse
firstFrame.ellipse(100, -50, 100, 100, pink);
// start animation
firstFrame.gifAnimBegin(anim, 1, -1);
firstFrame.gifAnimAdd(anim, 0, 0, 0, 5, 1, null);

var totalFrames = [];
for(var i = 0; i < 30; i++) {
  totalFrames.push(i);
}

totalFrames.forEach(function(i, idx, arr) {
  var frame = gd.createSync(200, 200);
  arr[idx] = frame;
  frame.ellipse(100, (i * 10 - 40), 100, 100, pink);
  var lastFrame = i === 0 ? firstFrame : arr[i - 1];
  frame.gifAnimAdd(anim, 0, 0, 0, 5, 1, lastFrame);
  frame.destroy();
});

firstFrame.gifAnimEnd(anim);
firstFrame.destroy();

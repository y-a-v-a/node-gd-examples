var gd = require('node-gd');

var img = gd.createTrueColorSync(200, 200);

var points = [];
for (var i = 0; i <= 6; i++) {
  points.push(hex_corner({ 'x': 100, 'y': 100}, 80, i));
}

var background = img.colorAllocate(255, 255, 255, 127);
var green = img.colorAllocate(128, 189, 1, 127);

img.fill(0, 0, background);
img.setThickness(6);
img.filledPolygon(points, green);

img.jpeg('../output/hexagon.jpg', 100);

function hex_corner(center, size, i) {
  var angle_deg = 60 * i   + 30;
  var angle_rad = Math.PI / 180 * angle_deg;
  return { 'x': Math.round(center.x + size * Math.cos(angle_rad)),
           'y': Math.round(center.y + size * Math.sin(angle_rad)) }
}

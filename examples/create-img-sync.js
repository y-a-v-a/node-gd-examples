const gd = require('node-gd');

async function main() {
  const img = gd.createTrueColorSync(200, 200);

  const points = [];
  const center = { 'x': 100, 'y': 100 };

  for (let i = 0; i <= 6; i++) {
    points.push(hex_corner(center, 80, i));
  }

  const background = img.colorAllocate(255, 255, 255, 127);
  const green = img.colorAllocate(128, 189, 1, 127);

  img.fill(0, 0, background);
  img.setThickness(6);
  img.filledPolygon(points, green);

  await img.jpeg(`../output/hexagon-${Date.now()}.jpg`, 100);
  img.destroy();
}

/**
 * as taken from http://www.redblobgames.com/grids/hexagons/
 */
function hex_corner(center, size, i) {
  const angle_deg = 60 * i + 30;
  const angle_rad = Math.PI / 180 * angle_deg;
  return { 'x': Math.round(center.x + size * Math.cos(angle_rad)),
           'y': Math.round(center.y + size * Math.sin(angle_rad)) }
}

main();

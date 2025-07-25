// Basic 6-face cube representation with colors:
// U: white, D: yellow, F: green, B: blue, R: red, L: orange

const colors = {
  U: 'white',
  D: 'yellow',
  F: 'green',
  B: 'blue',
  R: 'red',
  L: 'orange',
};

const faceOrder = ['U', 'L', 'F', 'R', 'B', 'D'];

// Cube state: each face is an array of 9 squares (colors)
let cube = {};

// Initialize solved cube
function initCube() {
  cube = {};
  faceOrder.forEach(face => {
    cube[face] = Array(9).fill(colors[face]);
  });
}

// Draw the cube net on canvas
function drawCube() {
  const canvas = document.getElementById('cubeCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const size = 40; // size of each square
  const gap = 5;
  ctx.lineWidth = 2;

  // Positions for each face in the net
  //       U
  //  L  F  R  B
  //       D
  const positions = {
    U: { x: size * 3 + gap * 3, y: gap },
    L: { x: gap, y: size * 3 + gap * 2 },
    F: { x: size * 3 + gap * 3, y: size * 3 + gap * 2 },
    R: { x: size * 6 + gap * 5, y: size * 3 + gap * 2 },
    B: { x: size * 9 + gap * 7, y: size * 3 + gap * 2 },
    D: { x: size * 3 + gap * 3, y: size * 6 + gap * 4 },
  };

  for (const face in cube) {
    const pos = positions[face];
    for (let i = 0; i < 9; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = pos.x + col * (size + gap);
      const y = pos.y + row * (size + gap);

      // Draw square
      ctx.fillStyle = cube[face][i];
      ctx.fillRect(x, y, size, size);

      // Draw border
      ctx.strokeStyle = '#333';
      ctx.strokeRect(x, y, size, size);
    }
  }
}

// Rotate face clockwise
function rotateFaceCW(face) {
  const oldFace = cube[face].slice();
  cube[face][0] = oldFace[6];
  cube[face][1] = oldFace[3];
  cube[face][2] = oldFace[0];
  cube[face][3] = oldFace[7];
  cube[face][4] = oldFace[4];
  cube[face][5] = oldFace[1];
  cube[face][6] = oldFace[8];
  cube[face][7] = oldFace[5];
  cube[face][8] = oldFace[2];
}

// TODO: Implement the full moves with side effects for each face turn

// List of steps for the layer-by-layer solver with descriptions
const steps = [
  { name: 'Daisy', desc: 'Gather white edges around yellow center.' },
  { name: 'Cross', desc: 'Match white edge colors with center colors and form a cross.' },
  { name: 'First Layer Corners', desc: 'Place white corners in correct position.' },
  { name: 'Second Layer', desc: 'Insert edges of the second layer correctly.' },
  { name: 'Top Yellow Cross', desc: 'Make a yellow cross on the top face.' },
  { name: 'Position Last Layer Corners', desc: 'Position yellow corners correctly.' },
  { name: 'Twist Last Layer Corners', desc: 'Twist yellow corners to correct orientation.' },
  { name: 'Position Last Layer Edges', desc: 'Position yellow edges correctly to complete the cube.' },
];

let currentStep = 0;

function nextStep() {
  if (currentStep < steps.length) {
    const step = steps[currentStep];
    document.getElementById('stepDescription').textContent = `${step.name}: ${step.desc}`;
    // TODO: Perform the moves or visual demonstration of this step
    currentStep++;
  } else {
    document.getElementById('stepDescription').textContent = 'Cube solved! Congratulations!';
  }
}

document.getElementById('resetBtn').onclick = () => {
  initCube();
  currentStep = 0;
  document.getElementById('stepDescription').textContent = '';
  drawCube();
};

document.getElementById('scrambleBtn').onclick = () => {
  // TODO: Implement scrambling
  alert('Scramble not yet implemented.');
};

document.getElementById('stepBtn').onclick = () => {
  nextStep();
};

window.onload = () => {
  initCube();
  drawCube();
};

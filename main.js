import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -400, 400,   // left, right
  400, -400,   // top, bottom
  0.1, 1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// Create the "DVD logo" as a PlaneGeometry
let dvdWidth = 100;
let dvdHeight = 50;
let geometry = new THREE.PlaneGeometry(dvdWidth, dvdHeight);
let material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
let dvdLogo = new THREE.Mesh(geometry, material);
scene.add(dvdLogo);

// Start position
dvdLogo.position.set(0, 0, 0);

// Movement speed
let velocityX = 3;
let velocityY = 3;

// Bounds (±400 is the screen size, but we account for half of logo size)
let boundX = 400;
let boundY = 400;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move logo
  dvdLogo.position.x += velocityX;
  dvdLogo.position.y += velocityY;

  // Collision detection with bounds
  if (
    dvdLogo.position.x + dvdWidth / 2 >= boundX ||
    dvdLogo.position.x - dvdWidth / 2 <= -boundX
  ) {
    velocityX *= -1;
    changeColorAndShrink();
  }

  if (
    dvdLogo.position.y + dvdHeight / 2 >= boundY ||
    dvdLogo.position.y - dvdHeight / 2 <= -boundY
  ) {
    velocityY *= -1;
    changeColorAndShrink();
  }

  renderer.render(scene, camera);
}

// Function: randomize color + shrink
function changeColorAndShrink() {
  dvdLogo.material.color.set(getRandomColor());
  dvdLogo.scale.multiplyScalar(0.85); // shrink by 15% every hit

  // After 5-8 bounces, object should vanish (scale tiny)
  if (dvdLogo.scale.x < 0.05 || dvdLogo.scale.y < 0.05) {
    scene.remove(dvdLogo);
  }
}

// Random color generator
function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}

animate();

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// Scene + Camera
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -400, 400,   // left, right
  400, -400,   // top, bottom
  0.1, 1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// DVD Logo Plane
let dvdWidth = 150;
let dvdHeight = 80;
const geometry = new THREE.PlaneGeometry(dvdWidth, dvdHeight);

// Load DVD logo texture (make sure dvd-logo.png is in /assets/)
const textureLoader = new THREE.TextureLoader();
const dvdTexture = textureLoader.load("assets/dvd-logo.png");

const material = new THREE.MeshBasicMaterial({
  map: dvdTexture,
  transparent: true,
  color: 0xffffff // white tint by default
});

const dvdLogo = new THREE.Mesh(geometry, material);
scene.add(dvdLogo);

// Start at origin
dvdLogo.position.set(0, 0, 0);

// Velocity
let velocityX = 3;
let velocityY = 3;

// Screen bounds
const boundX = 400;
const boundY = 400;

function animate() {
  requestAnimationFrame(animate);

  // Move
  dvdLogo.position.x += velocityX;
  dvdLogo.position.y += velocityY;

  // Bounce X
  if (dvdLogo.position.x + (dvdWidth * dvdLogo.scale.x) / 2 >= boundX ||
      dvdLogo.position.x - (dvdWidth * dvdLogo.scale.x) / 2 <= -boundX) {
    velocityX *= -1;
    changeColorAndShrink();
  }

  // Bounce Y
  if (dvdLogo.position.y + (dvdHeight * dvdLogo.scale.y) / 2 >= boundY ||
      dvdLogo.position.y - (dvdHeight * dvdLogo.scale.y) / 2 <= -boundY) {
    velocityY *= -1;
    changeColorAndShrink();
  }

  renderer.render(scene, camera);
}

// Tint + shrink on collision
function changeColorAndShrink() {
  dvdLogo.material.color.set(getRandomColor());
  dvdLogo.scale.multiplyScalar(0.85);

  if (dvdLogo.scale.x < 0.05 || dvdLogo.scale.y < 0.05) {
    scene.remove(dvdLogo);
  }
}

// Random color
function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}

animate();

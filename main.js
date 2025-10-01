// ================================
// Bouncing DVD Screen with Logo Texture
// ================================

const WIDTH = 800;
const HEIGHT = 800;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, 1, 1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// Load DVD Logo Texture
const textureLoader = new THREE.TextureLoader();
const dvdTexture = textureLoader.load("dvd_logo.png");

const dvdGeometry = new THREE.PlaneGeometry(120, 60);
const dvdMaterial = new THREE.MeshBasicMaterial({
  map: dvdTexture,
  color: 0xffffff, // base white so tint works properly
  transparent: true
});

const dvdLogo = new THREE.Mesh(dvdGeometry, dvdMaterial);
scene.add(dvdLogo);

// Movement variables
let dx = 3;
let dy = 2;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move DVD logo
  dvdLogo.position.x += dx;
  dvdLogo.position.y += dy;

  // Check horizontal bounds
  if (dvdLogo.position.x + (60 * dvdLogo.scale.x) >= WIDTH / 2 ||
      dvdLogo.position.x - (60 * dvdLogo.scale.x) <= -WIDTH / 2) {
    dx = -dx;
    handleBounce();
  }

  // Check vertical bounds
  if (dvdLogo.position.y + (30 * dvdLogo.scale.y) >= HEIGHT / 2 ||
      dvdLogo.position.y - (30 * dvdLogo.scale.y) <= -HEIGHT / 2) {
    dy = -dy;
    handleBounce();
  }

  renderer.render(scene, camera);
}

// Handle bounce (tint + shrink)
function handleBounce() {
  dvdLogo.material.color.set(getRandomColor());
  dvdLogo.scale.multiplyScalar(0.85);

  // Hide when too small
  if (dvdLogo.scale.x < 0.05 || dvdLogo.scale.y < 0.05) {
    dvdLogo.visible = false;
  }
}

// Random color generator
function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}

// Start animation
animate();

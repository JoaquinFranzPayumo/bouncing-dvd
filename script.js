// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -400, 400, 400, -400, 0.1, 1000 // restrict to 800x800
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

// PlaneGeometry for DVD object
const geometry = new THREE.PlaneGeometry(100, 50); 
let color = new THREE.Color(Math.random(), Math.random(), Math.random());
let material = new THREE.MeshBasicMaterial({ color: color });
const dvdLogo = new THREE.Mesh(geometry, material);
scene.add(dvdLogo);

// Position camera
camera.position.z = 500;

// Movement variables
let velocityX = 3;
let velocityY = 2;
let shrinkFactor = 0.9;
let bounceCount = 0;

// Render loop
function animate() {
  requestAnimationFrame(animate);

  // Move object
  dvdLogo.position.x += velocityX;
  dvdLogo.position.y += velocityY;

  // Boundaries (account for object size)
  const halfWidth = dvdLogo.scale.x * 50;  // since width = 100
  const halfHeight = dvdLogo.scale.y * 25; // since height = 50

  if (dvdLogo.position.x + halfWidth >= 400 || dvdLogo.position.x - halfWidth <= -400) {
    velocityX *= -1;
    handleBounce();
  }

  if (dvdLogo.position.y + halfHeight >= 400 || dvdLogo.position.y - halfHeight <= -400) {
    velocityY *= -1;
    handleBounce();
  }

  renderer.render(scene, camera);
}

// Bounce behavior: change color and shrink
function handleBounce() {
  // New random color
  dvdLogo.material.color.setRGB(Math.random(), Math.random(), Math.random());
  
  // Shrink
  dvdLogo.scale.multiplyScalar(shrinkFactor);

  bounceCount++;
  
  // Stop rendering if too small
  if (bounceCount >= 8 || dvdLogo.scale.x < 0.05) {
    dvdLogo.visible = false;
  }
}

animate();

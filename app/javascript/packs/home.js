import * as THREE from 'three'

// Colors
const white = new THREE.Color( 0xffffff )
const black = new THREE.Color( 0x000000 )

// Scene Camara Renderer
const scene = new THREE.Scene();
scene.background = white;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#home'),
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.10, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: black });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function addStar2() {
  const geometry = new THREE.SphereGeometry(0.10, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: black });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z - 100 );
  scene.add(star);
}

Array(200).fill().forEach(addStar);
Array(200).fill().forEach(addStar2);

// Torus

const geometry = new THREE.TorusGeometry(40, 3, 16, 200);
const material = new THREE.MeshStandardMaterial({ color: 0x7f00ff });
const torus = new THREE.Mesh(geometry, material);
torus.position.z -= 100
scene.add(torus);

// Move Camara

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 0.05 + 5;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera );
};

animate();

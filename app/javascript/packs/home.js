import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Colors
const white = new THREE.Color(0xffffff);
const black = new THREE.Color(0x000000);
const grey = new THREE.Color(0x808080);

// Scene Camara Renderer
const scene = new THREE.Scene();
scene.background = white;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 13;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#home"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls

// const controls = new OrbitControls( camera, renderer.domElement );

// Room

const texture = new THREE.TextureLoader().load(
  "https://media.istockphoto.com/photos/laminate-wooden-floor-texture-background-picture-id1083302826?k=20&m=1083302826&s=170667a&w=0&h=bSRz2bpnwImMIWa1qPOw7pRIW4EWd_j1zE3zHrdoDtc="
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 10;
texture.repeat.y = 1;

const roomLength = 500;

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(roomLength, 0.2, 20),
  new THREE.MeshPhongMaterial({ color: grey })
);
floor.material = new THREE.MeshPhongMaterial({ map: texture });
floor.position.set(0, -10, -10);
floor.position.x += roomLength / 2 - 40;
scene.add(floor);

const backwall = floor.clone();
backwall.material = new THREE.MeshPhongMaterial({ map: texture });
backwall.position.z -= 10;
backwall.position.y += 10;
backwall.rotation.x += 1.57;
scene.add(backwall);

const roof = floor.clone();
roof.material = new THREE.MeshPhongMaterial({ color: grey });
roof.position.y += 20;
scene.add(roof);


// Bookshelf


const bottom = new THREE.Mesh( new THREE.BoxGeometry( 10, 0.2, 10 ), new THREE.MeshPhongMaterial( {color: grey} ) );
bottom.position.set(0, -8, -10);
scene.add(bottom);

const back = new THREE.Mesh( new THREE.BoxGeometry( 10, 10, 0.2 ), new THREE.MeshPhongMaterial( {color: grey} ) );
back.position.set(0, 0, -15);
scene.add( back );


const shelf1 = bottom.clone();
shelf1.position.y += 5;
scene.add(shelf1);

const shelf2 = bottom.clone();
shelf2.position.y += 10;
scene.add(shelf2);

const shelf3 = bottom.clone();
shelf3.position.y += 15;

scene.add( shelf3 );

const shelf4 = bottom.clone();
shelf4.position.y += 20;
scene.add( shelf4 );

// Bookshelf parameters

let width = document.getElementById("width")
let height = document.getElementById("height")
let depth = document.getElementById("depth")
let shelves = document.getElementById("shelves")

width.addEventListener("input", (ev) => {
  ev.preventDefault();

  let x = width.value / 100;
  bottom.scale.x = x;
  back.scale.x = x;
  shelf1.scale.x = x;
  shelf2.scale.x = x;
  shelf3.scale.x = x;
  shelf4.scale.x = x;

  console.log(width.value);

  renderer.render( scene, camera );
});

height.addEventListener("input", (ev) => {
  ev.preventDefault();

  let y = height.value / 100;
  back.scale.y = y;
  back.position.y = -8 + height.value / 20;

  bottom.position.y = -8;
  shelf1.position.y = -3 - (200 - height.value) / 10 / 4;
  shelf2.position.y = 2 - (200 - height.value) / 10 / 2;
  shelf3.position.y = 7 - (200 - height.value) / 10 / (4 / 3);
  shelf4.position.y = 12 - (200 - height.value) / 10;

  renderer.render( scene, camera );
});

depth.addEventListener("input", (ev) => {
  ev.preventDefault();

  let z = depth.value / 100;
  bottom.scale.z = z;
  bottom.position.z = -15 + (depth.value / 20);
  shelf1.scale.z = z;
  shelf1.position.z = -15 + (depth.value / 20);
  shelf2.scale.z = z;
  shelf2.position.z = -15 + (depth.value / 20);
  shelf3.scale.z = z;
  shelf3.position.z = -15 + (depth.value / 20);
  shelf4.scale.z = z;
  shelf4.position.z = -15 + (depth.value / 20);

  console.log(width.value);

  renderer.render( scene, camera );
});

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Torus

const geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 200);
const material = new THREE.MeshStandardMaterial({ color: 0x7f00ff });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(30, 8, -10);
scene.add(torus);

// Move Camara

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.x = t * -0.05;
  
  const x = 10

  bottom.position.x = t * -0.05 - x;
  shelf1.position.x = t * -0.05 - x;
  shelf2.position.x = t * -0.05 - x;
  shelf3.position.x = t * -0.05 - x;
  shelf4.position.x = t * -0.05 - x;
  back.position.x = t * -0.05 - x;
}

document.body.onscroll = moveCamera;
moveCamera();

const rotation = false;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  if (rotation === true) {
    bottom.rotation.y += 0.01;
    shelf1.rotation.y += 0.01;
    shelf2.rotation.y += 0.01;
    shelf3.rotation.y += 0.01;
    back.rotation.y += 0.01;
  }

  // controls.update();

  renderer.render(scene, camera);
}

animate();

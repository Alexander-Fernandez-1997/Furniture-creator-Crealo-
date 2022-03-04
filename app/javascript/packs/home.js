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

// bsx = Bookshelf x dimension
// bsy = Bookshelf y dimension
// bsz = Bookshelf z dimension

// bspy = Bookshelf y position
// bspz = Bookshelf z position

// sh = Shelf height

const bsx = 10;
const bsy = 15;
const bsz = 5;

const bspy = -8;
const bspz = -10;

const sh = 2;

const bottom = new THREE.Mesh(
  new THREE.BoxGeometry(bsx, 0.2, bsz),
  new THREE.MeshPhongMaterial({ color: grey })
);
bottom.position.set(0, bspy, bspz);
scene.add(bottom);

const back = new THREE.Mesh(
  new THREE.BoxGeometry(bsx, bsy, 0.2),
  new THREE.MeshPhongMaterial({ color: grey })
);
back.position.set(0, -0.5, bspz - bsz / 2);
scene.add(back);

const shelf1 = bottom.clone();
shelf1.position.y += sh;
scene.add(shelf1);

const shelf2 = bottom.clone();
shelf2.position.y += sh * 2;
scene.add(shelf2);

const shelf3 = bottom.clone();
shelf3.position.y += sh * 3;
scene.add(shelf3);

const shelf4 = bottom.clone();
shelf4.position.y += sh * 4;
scene.add(shelf4);

const shelf5 = bottom.clone();
shelf5.position.y += sh * 5;
scene.add(shelf5);

const shelf6 = bottom.clone();
shelf6.position.y += sh * 6;

const shelf7 = bottom.clone();
shelf7.position.y += sh * 7;

const shelf8 = bottom.clone();
shelf8.position.y += sh * 8;

const shelf9 = bottom.clone();
shelf9.position.y += sh * 9;

const shelf10 = bottom.clone();
shelf10.position.y += sh * 10;

// Bookshelf parameters

let width = document.getElementById("width");
let height = document.getElementById("height");
let depth = document.getElementById("depth");
let shelves = document.getElementById("shelves");

let osv = parseInt(shelves.value, 10);

shelves.addEventListener("input", (ev) => {
  ev.preventDefault();

  let nsv = parseInt(shelves.value, 10);

  if (nsv > osv) {
    console.log("es mas grande");
    scene.add(eval(`shelf` + `${osv}`));
  } else {
    console.log("es mas chico");
    scene.remove(eval(`shelf` + `${nsv}`));
  }

  osv = shelves.value;
  renderer.render(scene, camera);
});

width.addEventListener("input", (ev) => {
  ev.preventDefault();

  let x = width.value / (bsx * 10);
  bottom.scale.x = x;
  back.scale.x = x;
  shelf1.scale.x = x;
  shelf2.scale.x = x;
  shelf3.scale.x = x;
  shelf4.scale.x = x;
  shelf5.scale.x = x;
  shelf6.scale.x = x;
  shelf7.scale.x = x;
  shelf8.scale.x = x;
  shelf10.scale.x = x;
});

height.addEventListener("input", (ev) => {
  ev.preventDefault();

  let y = height.value / (bsy * 10);
  back.scale.y = y;
  back.position.y = bspy + height.value / 20;

  let sc = 10;

  bottom.position.y = bspy;
  shelf1.position.y = bspy + sh - (200 - height.value) / 10 / sc;
  shelf2.position.y = bspy + sh * 2 - (200 - height.value) / 10 / (sc / 2);
  shelf3.position.y = bspy + sh * 3 - (200 - height.value) / 10 / (sc / 3);
  shelf4.position.y = bspy + sh * 4 - (200 - height.value) / 10 / (sc / 4);
  shelf5.position.y = bspy + sh * 5 - (200 - height.value) / 10 / (sc / 5);
  shelf6.position.y = bspy + sh * 6 - (200 - height.value) / 10 / (sc / 6);
  shelf7.position.y = bspy + sh * 7 - (200 - height.value) / 10 / (sc / 7);
  shelf8.position.y = bspy + sh * 8 - (200 - height.value) / 10 / (sc / 8);
  shelf9.position.y = bspy + sh * 9 - (200 - height.value) / 10 / (sc / 9);
  shelf10.position.y = bspy + sh * 10 - (200 - height.value) / 10 / (sc / 10);
});

depth.addEventListener("input", (ev) => {
  ev.preventDefault();

  let z = depth.value / (bsz * 10);
  bottom.scale.z = z;
  bottom.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf1.scale.z = z;
  shelf1.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf2.scale.z = z;
  shelf2.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf3.scale.z = z;
  shelf3.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf4.scale.z = z;
  shelf4.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf5.scale.z = z;
  shelf5.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf6.scale.z = z;
  shelf6.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf7.scale.z = z;
  shelf7.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf8.scale.z = z;
  shelf8.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf9.scale.z = z;
  shelf9.position.z = bspz + depth.value / 20 - bsz / 2;
  shelf10.scale.z = z;
  shelf10.position.z = bspz + depth.value / 20 - bsz / 2;
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
  const t = document.getElementById("wrapper").getBoundingClientRect().left;

  camera.position.x = t * -0.05;

  const x = 0;

  bottom.position.x = t * -0.05 - x;
  shelf1.position.x = t * -0.05 - x;
  shelf2.position.x = t * -0.05 - x;
  shelf3.position.x = t * -0.05 - x;
  shelf4.position.x = t * -0.05 - x;
  back.position.x = t * -0.05 - x;
}

document.getElementById("outer-wrapper").onscroll = moveCamera;
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

// new furniture sliders
let swidth = document.getElementById("swidth");
let sheight = document.getElementById("sheight");
let sdepth = document.getElementById("sdepth");
let sshelves = document.getElementById("sshelves");

width.addEventListener("input", (e) => {
  e.preventDefault();
  swidth.value = width.value;
});
height.addEventListener("input", (e) => {
  e.preventDefault();
  sheight.value = height.value;
});
depth.addEventListener("input", (e) => {
  e.preventDefault();
  sdepth.value = depth.value;
});
shelves.addEventListener("input", (e) => {
  e.preventDefault();
  sshelves.value = shelves.value;
});
// // termina aca el slider de new

import * as THREE from "three";

//______________________________________________________________________________ COLORS ________________________________

const white = new THREE.Color(0xffffff);
const black = new THREE.Color(0x000000);
const grey = new THREE.Color(0x808080);

//______________________________________________________________________________ SCENE _________________________________

const scene = new THREE.Scene();
scene.background = white;

//______________________________________________________________________________ CAMARA ________________________________

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

//______________________________________________________________________________ RENDERER ______________________________

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#home"),
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//______________________________________________________________________________ ROOM __________________________________

const roomTexture = new THREE.TextureLoader().load(
  "https://media.istockphoto.com/photos/laminate-wooden-floor-texture-background-picture-id1083302826?k=20&m=1083302826&s=170667a&w=0&h=bSRz2bpnwImMIWa1qPOw7pRIW4EWd_j1zE3zHrdoDtc="
);
roomTexture.wrapS = THREE.RepeatWrapping;
roomTexture.wrapT = THREE.RepeatWrapping;
roomTexture.repeat.x = 1;
roomTexture.repeat.y = 1;

const roomLength = 80;

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(roomLength, 0.2, 30),
  new THREE.MeshPhongMaterial({ color: grey })
);
floor.material = new THREE.MeshPhongMaterial({ map: roomTexture });
floor.position.set(0, -10, -10);
floor.position.x += roomLength / 2 - 40;
scene.add(floor);

const backwall = floor.clone();
backwall.material = new THREE.MeshPhongMaterial({ map: roomTexture });
backwall.position.z -= 10;
backwall.position.y += 10;
backwall.rotation.x += 1.57;
scene.add(backwall);

const roof = floor.clone();
roof.material = new THREE.MeshPhongMaterial({ color: grey });
roof.position.y += 25;
scene.add(roof);

//______________________________________________________________________________ BOOKSHELF MODEL _______________________

//______________________________________________________________________________ TEXTURES

//const bookshelfTexture = new THREE.TextureLoader().load(
//);

//______________________________________________________________________________ VARIABLES

const bsx = 6; // Bookshelf x dimension
const bsy = 18; // Bookshelf y dimension
const bsz = 3; // Bookshelf z dimension

const bspy = -(bsy / 2); // Bookshelf y position
const bspz = -10; // Bookshelf z position

const bt = 0.2; // Back thickness

const sh = bsy / 5; // Shelf height
const st = 0.2; // Shelf thickness

//______________________________________________________________________________ MESH CREATION

const bottom = new THREE.Mesh(
  new THREE.BoxGeometry(bsx, st, bsz),
  new THREE.MeshPhongMaterial({ color: grey })
);
bottom.position.set(0, bspy, bspz);
scene.add(bottom);

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

const backGeometry = new THREE.BoxGeometry(bsx, bsy, bt);
const back = new THREE.Mesh(
  backGeometry,
  new THREE.MeshPhongMaterial({ color: grey })
);
back.position.set(0, 0, bspz - bsz / 2);
scene.add(back);

//______________________________________________________________________________ INPUT VARIABLES

let width = document.getElementById("width");
let height = document.getElementById("height");
let depth = document.getElementById("depth");
let shelves = document.getElementById("shelves");

//______________________________________________________________________________ SHELVES LISTENER

let osv = parseInt(shelves.value, 10);

shelves.addEventListener("input", (ev) => {
  ev.preventDefault();

  let nsv = parseInt(shelves.value, 10);

  if (nsv > osv) {
    scene.add(eval(`shelf` + `${osv}`));
    back.scale.y += back.scale.y * (1 / (osv - 1));
    back.position.y += (height.value / 20) * (1 / (osv - 1));
    height.value = height.value * ((nsv - 1) / (osv - 1));
  } else {
    scene.remove(eval(`shelf` + `${nsv}`));
    back.scale.y -= back.scale.y * (1 / (osv - 1));
    back.position.y -= (height.value / 20) * (1 / (osv - 1));
    height.value -= height.value * (1 / (osv - 1));
  }

  osv = shelves.value;
});

//______________________________________________________________________________ HEIGHT LISTENER

height.addEventListener("input", (ev) => {
  ev.preventDefault();

  const sy = height.value / (bsy * 10); // Scale y
  let sv = shelves.value; // Shelves value
  let sc = sv - 1; // Shelf count
  const sha = (2 * 10) / sc; // Shelf height actualized

  back.scale.y = sy;
  back.position.y = bspy + height.value / 20;

  bottom.position.y = bspy;
  shelf1.position.y = bspy + sha * 1 - ((200 - height.value) / 10) * (1 / sc);
  shelf2.position.y = bspy + sha * 2 - ((200 - height.value) / 10) * (2 / sc);
  shelf3.position.y = bspy + sha * 3 - ((200 - height.value) / 10) * (3 / sc);
  shelf4.position.y = bspy + sha * 4 - ((200 - height.value) / 10) * (4 / sc);
  shelf5.position.y = bspy + sha * 5 - ((200 - height.value) / 10) * (5 / sc);
  shelf6.position.y = bspy + sha * 6 - ((200 - height.value) / 10) * (6 / sc);
  shelf7.position.y = bspy + sha * 7 - ((200 - height.value) / 10) * (7 / sc);
  shelf8.position.y = bspy + sha * 8 - ((200 - height.value) / 10) * (8 / sc);
  shelf9.position.y = bspy + sha * 9 - ((200 - height.value) / 10) * (9 / sc);
  shelf10.position.y =
    bspy + sha * 10 - ((200 - height.value) / 10) * (10 / sc);
});

//______________________________________________________________________________ WIDTH LISTENER

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
  shelf9.scale.x = x;
  shelf10.scale.x = x;
});

//______________________________________________________________________________ DEPTH LISTENER

depth.addEventListener("input", (ev) => {
  ev.preventDefault();

  const zp = bspz + depth.value / 20 - bsz / 2;

  let zs = depth.value / (bsz * 10);
  bottom.scale.z = zs;
  bottom.position.z = zp;
  shelf1.scale.z = zs;
  shelf1.position.z = zp;
  shelf2.scale.z = zs;
  shelf2.position.z = zp;
  shelf3.scale.z = zs;
  shelf3.position.z = zp;
  shelf4.scale.z = zs;
  shelf4.position.z = zp;
  shelf5.scale.z = zs;
  shelf5.position.z = zp;
  shelf6.scale.z = zs;
  shelf6.position.z = zp;
  shelf7.scale.z = zs;
  shelf7.position.z = zp;
  shelf8.scale.z = zs;
  shelf8.position.z = zp;
  shelf9.scale.z = zs;
  shelf9.position.z = zp;
  shelf10.scale.z = zs;
  shelf10.position.z = zp;
});

//______________________________________________________________________________ LIGHTS ________________________________

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//______________________________________________________________________________ CAMERA ANIMATION ______________________

function moveCamera() {
  const t = document.getElementById("wrapper").getBoundingClientRect().left;

  camera.position.x = t * -0.05;

  const x = 0;

  bottom.position.x = t * -0.05 - x;
  shelf1.position.x = t * -0.05 - x;
  shelf2.position.x = t * -0.05 - x;
  shelf3.position.x = t * -0.05 - x;
  shelf4.position.x = t * -0.05 - x;
  shelf5.position.x = t * -0.05 - x;
  shelf6.position.x = t * -0.05 - x;
  shelf7.position.x = t * -0.05 - x;
  shelf8.position.x = t * -0.05 - x;
  shelf9.position.x = t * -0.05 - x;
  shelf10.position.x = t * -0.05 - x;

  back.position.x = t * -0.05 - x;
}

// document.getElementById("outer-wrapper").onscroll = moveCamera;
// moveCamera();

const rotation = false;

//______________________________________________________________________________ ANIMATION LOOP ________________________

function animate() {
  requestAnimationFrame(animate);

  const bsr = 0.005;

  if (rotation === true) {
    bottom.rotation.y += bsr;
    shelf1.rotation.y += bsr;
    shelf2.rotation.y += bsr;
    shelf3.rotation.y += bsr;
    shelf4.rotation.y += bsr;
    shelf5.rotation.y += bsr;
    shelf6.rotation.y += bsr;
    shelf7.rotation.y += bsr;
    shelf8.rotation.y += bsr;
    shelf9.rotation.y += bsr;
    shelf10.rotation.y += bsr;

    back.rotation.y += bsr;
  }

  renderer.render(scene, camera);
}

animate();

//______________________________________________________________________________ NEW FURNITURE INPUT ___________________

let swidth = document.getElementById("swidth");
let sheight = document.getElementById("sheight");
let sdepth = document.getElementById("sdepth");
let sshelves = document.getElementById("sshelves");

let lwidth = document.getElementById("lwidth");
let lheight = document.getElementById("lheight");
let ldepth = document.getElementById("ldepth");
let lshelves = document.getElementById("lshelves");

width.addEventListener("input", (e) => {
  e.preventDefault();
  swidth.value = width.value;
  lwidth.insertAdjacentText("beforeend", width.value);
});
height.addEventListener("input", (e) => {
  e.preventDefault();
  sheight.value = height.value;
  lheight.insertAdjacentText("beforeend", height.value);
});
depth.addEventListener("input", (e) => {
  e.preventDefault();
  sdepth.value = depth.value;
  ldepth.insertAdjacentText("beforeend", depth.value);
});
shelves.addEventListener("input", (e) => {
  e.preventDefault();
  sshelves.value = shelves.value;
  lshelves.innerText = shelves.value;
  console.log("sup");
});

//______________________________________________________________________________ END ___________________________________

import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Colors
const white = new THREE.Color( 0xffffff )
const black = new THREE.Color( 0x000000 )
const grey = new THREE.Color( 0x808080 )


// Scene Camara Renderer
const scene = new THREE.Scene();
scene.background = white;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 15

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#home'),
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Orbit controls

// const controls = new OrbitControls( camera, renderer.domElement );

// Room

const floor = new THREE.Mesh( new THREE.BoxGeometry( 500, 0.2, 20 ), new THREE.MeshPhongMaterial( {color: grey} ) );
floor.position.set(0, -10, -10);
floor.position.x += 200
scene.add( floor );

const backwall = floor.clone();
backwall.position.z -= 10;
backwall.position.y += 10;
backwall.rotation.x += 1.57
scene.add( backwall );

const roof = floor.clone();
roof.position.y += 20;
scene.add( roof );

// Bookshelf

const bottom = new THREE.Mesh( new THREE.BoxGeometry( 10, 0.3, 5 ), new THREE.MeshPhongMaterial( {color: grey} ) );
bottom.position.set(0, -8, -10);
scene.add( bottom );

const back = new THREE.Mesh( new THREE.BoxGeometry( 10, 15, 0.3 ), new THREE.MeshPhongMaterial( {color: grey} ) );
back.position.set(0, 0, -10);
scene.add( back );

const shelf1 = bottom.clone();
shelf1.position.y += 5;
scene.add( shelf1 );

const shelf2 = bottom.clone();
shelf2.position.y += 10;
scene.add( shelf2 );

const shelf3 = bottom.clone();
shelf3.position.y += 15;
scene.add( shelf3 );



// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Torus

const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 200);
const material = new THREE.MeshStandardMaterial({ color: 0x7f00ff });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(21, 8, -10)
scene.add(torus);

// Move Camara

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.x = t * -0.05;
  bottom.position.x = t * -0.05;
  shelf1.position.x = t * -0.05;
  shelf2.position.x = t * -0.05;
  shelf3.position.x = t * -0.05;
  back.position.x = t * -0.05;

}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render( scene, camera );
};

animate();

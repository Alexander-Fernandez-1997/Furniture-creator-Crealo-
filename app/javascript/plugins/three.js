import * as THREE from "three";

const renderFurniture = (
  height = 180,
  width = 60,
  depth = 30,
  shelves = 5,
  texture = ""
) => {
  const canvasElement = document.querySelector("canvas#furniture");
  if (canvasElement) {
    console.log("Hello from canvas js");

    //__________________________________________________________________________ COLORS ________________________________

    const white = new THREE.Color(0xffffff);
    const black = new THREE.Color(0x000000);
    const grey = new THREE.Color(0x808080);

    //__________________________________________________________________________ SCENE _________________________________

    const scene = new THREE.Scene();
    scene.background = white;

    //__________________________________________________________________________ CAMARA ________________________________

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 13;

    //__________________________________________________________________________ RENDERER ______________________________

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //__________________________________________________________________________ ROOM __________________________________

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

    //__________________________________________________________________________ BOOKSHELF MODEL _______________________

    //________________________________________________________________  TEXTURES

    //const bookshelfTexture = new THREE.TextureLoader().load(
    //);

    //________________________________________________________________ VARIABLES

    const bsx = 6; // Bookshelf x dimension
    const bsy = 18; // Bookshelf y dimension
    const bsz = 3; // Bookshelf z dimension

    const bspy = -(bsy / 2); // Bookshelf y position
    const bspz = -10; // Bookshelf z position

    const bt = 0.2; // Back thickness

    const sh = bsy / 5; // Shelf height
    const st = 0.2; // Shelf thickness

    //____________________________________________________________ MESH CREATION

    const bottom = new THREE.Mesh(
      new THREE.BoxGeometry(bsx, st, bsz),
      new THREE.MeshPhongMaterial({ color: grey })
    );
    bottom.position.set(0, bspy, bspz);
    scene.add(bottom);

    const backGeometry = new THREE.BoxGeometry(bsx, bsy, bt);
    const back = new THREE.Mesh(
      backGeometry,
      new THREE.MeshPhongMaterial({ color: grey })
    );
    back.position.set(0, 0, bspz - bsz / 2);
    scene.add(back);

    //__________________________________________________________________________ LIGHTS ________________________________

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    //__________________________________________________________________________ MOVE CAMERA ___________________________

    function moveCamera() {
      const t = document.getElementById("wrapper").getBoundingClientRect().left;
    }

    // document.getElementById("outer-wrapper").onscroll = moveCamera;
    // moveCamera();

    //__________________________________________________________________________ ANIMATION LOOP_________________________

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    //__________________________________________________________________________ ANIMATION LOOP_________________________
  }
};

export { renderFurniture };

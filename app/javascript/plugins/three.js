import * as THREE from "three";

const renderFurniture = (
  height = document.getElementById("height"),
  width = document.getElementById("width"),
  depth = document.getElementById("depth"),
  shelves = document.getElementById("shelves"),
  textures = document.querySelectorAll("#cajitamin"),
) => {
  
  const canvasFurniture = document.querySelector("canvas#furniture");
  if (canvasFurniture) {
    //________________________________________________________________________ COLORS ________________________________

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
      canvas: canvasFurniture,
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

    // TEXTURES

    console.log(textures);

    let bookshelfTexture = new THREE.TextureLoader().load(
      "https://www.fimodecor.com/uploads/M9101-1.jpg"
    );

    textures.forEach((texture) => {
      texture.addEventListener("click", (ev) => {
        bookshelfTexture = new THREE.TextureLoader().load(
          `${texture.querySelector("#imgsize").src}`
        );
      })
    })

    function createBookshelf() {

      // Variables______________________________________________________________


      let mh = 200; // Bookshelf max height
      const bt = 0.2; // Back thickness
      const st = 0.2; // Shelf thickness
      const bspz = -10; // Bookshelf z position

      let bsx = width.value / 10; // Bookshelf x dimension
      let bsy = height.value / 10; // Bookshelf y dimension
      let bsz = depth.value / 10; // Bookshelf z dimension

      const bspy = -(bsy / 2); // Bookshelf y position
      let hd = (mh - height.value) / 10; // Height difference

      // Back___________________________________________________________________

      const backMesh = new THREE.Mesh(
        new THREE.BoxGeometry( bsx, bsy, bt ),
        new THREE.MeshPhongMaterial({ map: bookshelfTexture })
      );

      const back = backMesh.clone()
      back.position.set(0, -(hd / 2), bspz);
      meshArray.push(back);
      scene.add(back);

      // Sides__________________________________________________________________

      const sideMesh = new THREE.Mesh(
        new THREE.BoxGeometry( bsx, bsy, bt ),
        new THREE.MeshPhongMaterial({ color: grey })
      );

      // Shelves________________________________________________________________

      const shelfMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bsx, st, bsz),
        new THREE.MeshPhongMaterial({ map: bookshelfTexture })
      );

      shelfMesh.position.set(0, bspy - (hd / 2), bspz);
      let shelfPosition = bspy - (hd / 2);

      for (let step = 0; step < shelves.value; step++) {
        const shelf = shelfMesh.clone();
        shelf.position.y = shelfPosition;
        meshArray.push(shelf);
        scene.add(shelf);
        shelfPosition += (bsy / (shelves.value - 1));
      }

      // _______________________________________________________________________
    }

    let meshArray = [];
    createBookshelf();

    //__________________________________________________________________________ EVENT LISTENER ________________________

    function recreateBookshelf() {
      meshArray.forEach((element) => {
        scene.remove(element);
      })
      meshArray = [];
      createBookshelf();
    }

    document.addEventListener("input", (ev) => {
      ev.preventDefault();
      recreateBookshelf();
    })

    document.addEventListener("click", (ev) => {
      ev.preventDefault();
      recreateBookshelf();
    })

    //__________________________________________________________________________ LIGHTS ________________________________

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // MOVE CAMERA

    function moveCamera() {
      const t = document.getElementById("wrapper").getBoundingClientRect().left;
    }

    // document.getElementById("outer-wrapper").onscroll = moveCamera;
    // moveCamera();

    // ANIMATION LOOP

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    //__________________________________________________________________________ END____________________________________
  }
};

export { renderFurniture };

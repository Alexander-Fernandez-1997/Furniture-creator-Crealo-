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
    const darkGrey = new THREE.Color(0xa9a9a9);

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
    camera.position.z = 10;

    //__________________________________________________________________________ RENDERER ______________________________

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasFurniture,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //__________________________________________________________________________ LIGHTS ________________________________

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(70, 8, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

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
    backwall.material = new THREE.MeshPhongMaterial({ color: grey });
    backwall.position.z -= 10;
    backwall.position.y += 10;
    backwall.rotation.x += 1.57;
    scene.add(backwall);

    const rSideWall = floor.clone();
    rSideWall.material = new THREE.MeshPhongMaterial({ color: darkGrey });
    rSideWall.position.x += roomLength / 2;
    rSideWall.position.z -= 10;
    rSideWall.position.y += 10;
    rSideWall.rotation.x += 1.57;
    rSideWall.rotation.z += 1.57;
    scene.add(rSideWall);

    // const lSideWall = floor.clone();
    // lSideWall.material = new THREE.MeshPhongMaterial({ color: grey });
    // lSideWall.position.x -= roomLength / 2;
    // lSideWall.position.z -= 10;
    // lSideWall.position.y += 10;
    // lSideWall.rotation.x += 1.57;
    // lSideWall.rotation.z += 1.57;
    // lSideWall.rotation.y += 1.57 * 2;
    // scene.add(lSideWall);

    const roof = floor.clone();
    roof.material = new THREE.MeshPhongMaterial({ color: grey });
    roof.position.y += 25;
    scene.add(roof);

    //__________________________________________________________________________ BOOKSHELF MODEL _______________________

    // TEXTURES

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
      const sht = 0.2; // Shelf thickness
      const st = 0.2 // Side thickness
      const bspz = -10; // Bookshelf z position

      let bsx = width.value / 10; // Bookshelf x dimension
      let bsy = height.value / 10; // Bookshelf y dimension
      let bsz = depth.value / 10; // Bookshelf z dimension

      const bspy = -(bsy / 2) + sht; // Bookshelf y position
      let hd = (mh - height.value) / 10; // Height difference

      // Back___________________________________________________________________

      const backMesh = new THREE.Mesh(
        new THREE.BoxGeometry( bsx, bsy, bt ),
        new THREE.MeshPhongMaterial({ map: bookshelfTexture })
      );

      const back = backMesh.clone()
      back.position.set(0, -(hd / 2) + sht, bspz);
      meshArray.push(back);
      scene.add(back);

      // Sides__________________________________________________________________

      const sideMesh = new THREE.Mesh(
        new THREE.BoxGeometry( st, bsy, bsz ),
        new THREE.MeshPhongMaterial({ map: bookshelfTexture })
      );

      const rightSide = sideMesh.clone()
      rightSide.position.set((bsx / 2), -(hd / 2) + sht, bspz);
      meshArray.push(rightSide);
      scene.add(rightSide);

      const leftSide = sideMesh.clone()
      leftSide.position.set(-(bsx / 2), -(hd / 2) + sht, bspz);
      meshArray.push(leftSide);
      scene.add(leftSide);

      // Shelves________________________________________________________________

      const shelfMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bsx, sht, bsz),
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

    //__________________________________________________________________________ RECREATE FURNITURE ____________________

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
      recreateBookshelf();
    })

    //__________________________________________________________________________ MOVE CAMERA ___________________________

    function moveCamera() {
      // const t = document.scrollTop;
    }

    // document.getElementById("outer-wrapper").onscroll = moveCamera;
    // moveCamera();

    //__________________________________________________________________________ ANIMATION LOOP ________________________

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    //__________________________________________________________________________ END____________________________________

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
      slength.value = height.value;
    });
    depth.addEventListener("input", (e) => {
      e.preventDefault();
      sdepth.value = depth.value;
    });
    shelves.addEventListener("input", (e) => {
      e.preventDefault();
      sshelves.value = shelves.value;
    });

  }
};

export { renderFurniture };

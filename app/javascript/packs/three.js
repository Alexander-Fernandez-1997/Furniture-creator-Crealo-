import * as THREE from "three";

const renderFurniture = () => {

  let create = document.getElementById("create");
  let show = document.getElementById("show");

  let height;
  let width;
  let depth;
  let shelves;
  let textures;
  let material;
  let category;

  if (create) {
    height = document.getElementById("height");
    width = document.getElementById("width");
    depth = document.getElementById("depth");
    shelves = document.getElementById("shelves");
    textures = document.querySelectorAll("#cajitamin");
    category = document.getElementById("select");
  };

  if (show) {
    height = document.getElementById("showHeight");
    width = document.getElementById("showWidth");
    depth = document.getElementById("showDepth");
    shelves = document.getElementById("showShelves");
    material = document.getElementById("showMaterial").innerText;
    material = "https://www.fimodecor.com/uploads/M9101-1.jpg"
    category = document.getElementById("showCategory").innerText;

    console.log(document.getElementById("showHeight"));
    console.log(height.value);

    console.log(document.getElementById("showDepth"));
    console.log(depth.value);
  };

  const canvasFurniture = document.querySelector("canvas#furniture");

  if (canvasFurniture) {
    console.log("running");
    //________________________________________________________________________ COLORS ________________________________

    const white = new THREE.Color(0xffffff);
    const black = new THREE.Color(0x000000);
    const grey = new THREE.Color(0x808080);
    const salmon = new THREE.Color(0xfa8072);
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
    camera.position.z = 2.5;
    camera.position.y = 1.5;

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

    //__________________________________________________________________________ TEXTURES ______________________________

    const woodTexture = new THREE.TextureLoader().load(
      "https://www.fimodecor.com/uploads/M9101-1.jpg"
    );

    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.x = 15;
    woodTexture.repeat.y = 2;

    let furnitureTexture = new THREE.TextureLoader().load(
      "https://www.fimodecor.com/uploads/M9101-1.jpg"
    );

    if (create) {
      textures.forEach((texture) => {
        texture.addEventListener("click", (ev) => {
          furnitureTexture = new THREE.TextureLoader().load(
            `${texture.querySelector("#imgsize").src}`
          );
        });
      });
    }

    if (show) {
      furnitureTexture = new THREE.TextureLoader().load(
        material
      );
    }

    //__________________________________________________________________________ ROOM __________________________________

    const roomLength = 60;

    const roomMesh = new THREE.Mesh(
      new THREE.BoxGeometry(roomLength, 0.2, 30),
      new THREE.MeshPhongMaterial({ color: grey })
    );

    const roof = roomMesh.clone();
    roof.material = new THREE.MeshPhongMaterial({ map: woodTexture });
    roof.position.y += 15;
    roof.position.z -= 10;
    scene.add(roof);

    const floor = roomMesh.clone();
    floor.material = new THREE.MeshPhongMaterial({ color: 0x999999 });
    floor.position.set(roomLength / 2 - 30, -10, -10);
    scene.add(floor);

    const backTexture = new THREE.TextureLoader().load(
      "https://3docean.img.customer.envatousercontent.com/files/143861565/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=107ab7891e3d8698b2fcbf20cd0f873c"
    );

    backTexture.wrapS = THREE.RepeatWrapping;
    backTexture.wrapT = THREE.RepeatWrapping;
    backTexture.repeat.x = 4;
    backTexture.repeat.y = 2;

    const backwall = roomMesh.clone();
    backwall.material = new THREE.MeshPhongMaterial({ color: 0x7f163f });
    backwall.position.z -= 20;
    backwall.rotation.x += 1.57;
    scene.add(backwall);

    const rSideWall = roomMesh.clone();
    rSideWall.material = new THREE.MeshPhongMaterial({ color: 0x7f163f });
    rSideWall.position.x += roomLength / 2;
    rSideWall.position.z -= 10;
    rSideWall.rotation.x += 1.57;
    rSideWall.rotation.z += 1.57;
    scene.add(rSideWall);

    const lSideWall = roomMesh.clone();
    lSideWall.material = new THREE.MeshPhongMaterial({ color: 0x7f163f });
    lSideWall.position.x -= roomLength / 2;
    lSideWall.position.z -= 10;
    lSideWall.rotation.x += 1.57;
    lSideWall.rotation.z += 1.57;
    scene.add(lSideWall);



    //__________________________________________________________________________ BOOKSHELF MODEL _______________________

    function createBookshelf() {

      // Variables______________________________________________________________

      let mh = 200; // Bookshelf max height
      const bt = 0.2; // Back thickness
      const sht = 0.2; // Shelf thickness

      const st = 0.2; // Side thickness
      const bspz = -20 + bt; // Bookshelf z position

      let bsx = width.value / 10; // Bookshelf x dimension
      let bsy = height.value / 10; // Bookshelf y dimension
      let bsz = depth.value / 10; // Bookshelf z dimension

      const bspy = -(bsy / 2) + sht; // Bookshelf y position
      let hd = (mh - height.value) / 10; // Height difference

      // Back___________________________________________________________________

      const backMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bsx, bsy, bt),
        new THREE.MeshPhongMaterial({ map: furnitureTexture })
      );

      const back = backMesh.clone();
      back.name = "back"
      back.position.set(0, -(hd / 2) + sht, bspz);
      meshArray.push(back);
      scene.add(back);

      // Sides__________________________________________________________________

      const sideMesh = new THREE.Mesh(
        new THREE.BoxGeometry(st, bsy, bsz),
        new THREE.MeshPhongMaterial({ map: furnitureTexture })
      );

      const rightSide = sideMesh.clone();
      rightSide.name = "rightSide"
      rightSide.position.set(bsx / 2, -(hd / 2) + sht, bspz);
      meshArray.push(rightSide);
      scene.add(rightSide);

      const leftSide = sideMesh.clone();
      leftSide.name = "leftSide"
      leftSide.position.set(-(bsx / 2), -(hd / 2) + sht, bspz);
      meshArray.push(leftSide);
      scene.add(leftSide);

      // Shelves________________________________________________________________

      const shelfMesh = new THREE.Mesh(
        new THREE.BoxGeometry(bsx, sht, bsz),
        new THREE.MeshPhongMaterial({ map: furnitureTexture })
      );

      shelfMesh.position.set(0, bspy - hd / 2, bspz);
      let shelfPosition = bspy - hd / 2;

      for (let i = 0; i < (shelves.value); i++) {
        const shelf = shelfMesh.clone();
        shelf.name = "shelf"
        shelf.position.y = shelfPosition;
        meshArray.push(shelf);
        scene.add(shelf);
        shelfPosition += bsy / (shelves.value - 1);
      }

      // _______________________________________________________________________
    }

    //__________________________________________________________________________ TABLE MODEL ___________________________

    function createTable() {
      // Variables______________________________________________________________

      let mh = 200; // Table max height
      const tt = 0.2; // Table thickness
      const tpz = -15; // Table z position

      let tsx = width.value / 10; // Table x dimension
      let tsy = height.value / 10; // Table y dimension
      let tsz = depth.value / 10; // Table z dimension

      const tpy = -(tsy / 2); // Table y position

      const lt = 0.5; // Leg thickness

      // Back___________________________________________________________________

      const tableMesh = new THREE.Mesh(
        new THREE.BoxGeometry(tsx, tsz, tt),
        new THREE.MeshPhongMaterial({ map: furnitureTexture })
      );

      const table = tableMesh.clone();
      table.rotation.x += 1.57;
      table.position.set(0, tpy + tsy - 10, tpz);
      meshArray.push(table);
      scene.add(table);

      const legMesh = new THREE.Mesh(
        new THREE.BoxGeometry(lt, tsy, lt),
        new THREE.MeshPhongMaterial({ map: furnitureTexture })
      );

      const legrf = legMesh.clone();
      legrf.position.set((tsx / 2) - (lt / 2), (tpy + tsy - 10) - (tsy / 2), tpz + (tsz / 2) - (lt / 2));
      meshArray.push(legrf);
      scene.add(legrf);

      const legrb = legMesh.clone();
      legrb.position.set((tsx / 2) - (lt / 2), (tpy + tsy - 10) - (tsy / 2), tpz - (tsz / 2) + (lt / 2));
      meshArray.push(legrb);
      scene.add(legrb);

      const leglf = legMesh.clone();
      leglf.position.set(-(tsx / 2) + (lt / 2), (tpy + tsy - 10) - (tsy / 2), tpz + (tsz / 2) - (lt / 2));
      meshArray.push(leglf);
      scene.add(leglf);

      const leglb = legMesh.clone();
      leglb.position.set(-(tsx / 2) + (lt / 2), (tpy + tsy - 10) - (tsy / 2), tpz - (tsz / 2) + (lt / 2));
      meshArray.push(leglb);
      scene.add(leglb);

      // _______________________________________________________________________
    }

    //__________________________________________________________________________ CREATE FURNITURE ______________________

    let categoryValue;

    if (create) {
      categoryValue = select.options[select.selectedIndex].value;
    }

    if (show) {
      categoryValue = category;
    }

    let meshArray = [];

    if (categoryValue === "bookshelf") {
      createBookshelf();
    }

    if (categoryValue === "table") {
      createTable();
    }

    //__________________________________________________________________________ RECREATE FURNITURE ____________________

    function recreateFurniture() {
      categoryValue = select.options[select.selectedIndex].value;

      meshArray.forEach((element) => {
        scene.remove(element);
      });
      meshArray = [];

      console.log(categoryValue);

      if (categoryValue === "bookshelf") {
        createBookshelf();
      }

      if (categoryValue === "table") {
        createTable();
      }

      console.log(scene.children);
    }

    //__________________________________________________________________________ EVENT LISTENERS _______________________

    if (create) {

      category.addEventListener("change", (ev) => {
        recreateFurniture();
      });

      document.addEventListener("input", (ev) => {
        ev.preventDefault();
        recreateFurniture();
      });

      document.addEventListener("click", (ev) => {
        recreateFurniture();
      });

    };

    //__________________________________________________________________________ MOVE CAMERA ___________________________

    function moveCamera() {
      // const t = document.scrollTop;
    }

    // document.getElementById("outer-wrapper").onscroll = moveCamera;
    // moveCamera();

    //__________________________________________________________________________ ANIMATION LOOP ________________________

    // if (create) {
    //   for (let i = 0; i < (meshArray.length); i++) {
    //     scene.children[7 + i].position.y += 8 * (i + 1);
    //   };
    // };

    function animate() {
      requestAnimationFrame(animate);

      // if (create) {
      //   const speed = 0.2

      //   if (scene.children[7].position.y > -0.8) {
      //     scene.children[7].position.y -= speed;
      //   }
      //   if (scene.children[8].position.y > -0.8) {
      //     scene.children[8].position.y -= speed;
      //   }
      //   if (scene.children[9].position.y > -0.8) {
      //     scene.children[9].position.y -= speed;
      //   }
      //   if (scene.children[10].position.y > -9.8) {
      //     scene.children[10].position.y -= speed;
      //   }
      //   if (scene.children[11].position.y > -6.2) {
      //     scene.children[11].position.y -= speed;
      //   }
      //   if (scene.children[12].position.y > -2.6) {
      //     scene.children[12].position.y -= speed;
      //   }
      //   if (scene.children[13].position.y > 1) {
      //     scene.children[13].position.y -= speed;
      //   }
      //   if (scene.children[14].position.y > 4.6) {
      //     scene.children[14].position.y -= speed;
      //   }
      //   if (scene.children[15].position.y > 8.2) {
      //     scene.children[15].position.y -= speed;
      //   }
      // }

      renderer.render(scene, camera);
    }


    animate();


    //__________________________________________________________________________ SLIDERS INPUT__________________________

    let swidth = document.getElementById("swidth");
    let slength = document.getElementById("slength");
    let sdepth = document.getElementById("sdepth");
    let sshelves = document.getElementById("sshelves");

    let lwidth = document.getElementById("lwidth");
    let lheight = document.getElementById("lheight");
    let ldepth = document.getElementById("ldepth");
    let lshelves = document.getElementById("lshelves");

    width.addEventListener("input", (e) => {
      e.preventDefault();
      swidth.value = width.value;
      lwidth.innerText = `Width:${width.value}cm`;
    });
    height.addEventListener("input", (e) => {
      e.preventDefault();
      slength.value = height.value;
      lheight.innerText = `Height:${height.value}cm`;
    });
    depth.addEventListener("input", (e) => {
      e.preventDefault();
      sdepth.value = depth.value;
      ldepth.innerText = `Depth:${depth.value}cm`;
    });
    shelves.addEventListener("input", (e) => {
      e.preventDefault();
      sshelves.value = shelves.value;
      lshelves.innerText = `Shelves:${shelves.value - 1}`;
    });
    //__________________________________________________________________________ END____________________________________
  }
};

renderFurniture();

export { renderFurniture };

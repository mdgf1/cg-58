//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;

var camera, orbitalControls;
var cameraFactor = 7;

var ovni, moon, skyDome, ground, house;
var axisHelper;
var wireframes = false, changedWireframes = false;
var material0 = false, material1 = false, material2 = false, material3 = false, changedMaterial = false;
var bigLightOff = false, bigLightsOn = false;

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameraPerspectiv() {
    'use strict';
    var cameraPerspectiva = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspectiva.position.x = 125;
    cameraPerspectiva.position.y = 125;
    cameraPerspectiva.position.z = 125;
    cameraPerspectiva.lookAt(scene.position);
    camera = cameraPerspectiva;
}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    axisHelper = new THREE.AxisHelper(50);
    scene.add(axisHelper);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
}


////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createObjects() {
    axisHelper = new THREE.AxisHelper(50);
    scene.add(axisHelper);
    ovni = new Ovni();
    ovni.scale.set(2, 2, 2);
    moon = new Moon();
    skyDome = new SkyDome();
    ground = new Ground();
    house = new House();

    scene.add(house);
    scene.add(skyDome);
    scene.add(ovni);
    scene.add(ground);
    scene.add(moon);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////


////////////
/* UPDATE */
////////////

function update() {
    'use strict';
    orbitalControls.update();
    ovni.move();
    if (!changedMaterial && (material0 || material1 || material2 || material3)) {
        ovni.changeMaterials();
        changedMaterial = true;
    }

    if (!changedWireframes && wireframes) {
        ovni.wireframes();
        house.wireframes();
        changedWireframes = true;
    }
}

/////////////
/* DISPLAY */
/////////////

function render() {
    'use strict';
    renderer.render(scene, camera);
    renderer.setClearColor(0xffffff, 1);
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    createScene();
    createObjects();
    createCameraPerspectiv();
    orbitalControls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    // arrow left
    case 37:
        left = true;
        break;
    // arrow up
    case 38:
        up = true;
        break;
    // arrow right
    case 39:
        right = true;
        break;
    // arrow down
    case 40:
        down = true;
        break;
    
    
    case 54:   // tecla 6~
        wireframes = true;
        break;
    case 69:  //E
    case 101: //e
        material2 = true;
        break;
    case 81:  //Q
    case 113: //q
        material2 = true;
        break;
    case 82:  //R
    case 114: //r
        material0 = true;
        break;
    case 83:  //S
    case 115: //s
        bigLightOff = true;
        break;
    case 87:  //W
    case 119: //w
        material1 = true;
        break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
    // arrow left
    case 37:
        left = false;
        break;
    // arrow up
    case 38:
        up = false;
        break;
    // arrow right
    case 39:
        right = false;
        break;
    // arrow down
    case 40:
        down = false;
        break;

    case 54:   // tecla 6
        wireframes = false;
        changedWireframes = false;
        break;
    case 69:  //E
    case 101: //e
        material2 = false;
        break;
    case 81:  //Q
    case 113: //q
        material2 = false;
        break;
    case 82:  //R
    case 114: //r
        material0 = false;
        changedMaterial = false
        break;
    case 83:  //S
    case 115: //s
        bigLightOff = false;
        break;
    case 87:  //W
    case 119: //w
        material1 = false;
        break;
    }
    
}
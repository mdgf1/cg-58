//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer;

var camera, orbitalControls;
var cameraFactor = 7;

var ovni;
var skyDome;
var axisHelper;
var collision = false, alreadyInside = false;
var intersectZ = false, intersectX = false;
var wireframes = false, changedWireframes = false;

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////

function createCameraPerspectiv() {
    'use strict';
    var cameraPerspectiva = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspectiva.position.x = 100;
    cameraPerspectiva.position.y = 100;
    cameraPerspectiva.position.z = 100;
    cameraPerspectiva.lookAt(scene.position);
    camera = cameraPerspectiva;
}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////

function createSkyDome() {
    'use strict';
    
    const geometry = new THREE.SphereGeometry(400, 32, 16, 0, Math.PI ); 
    var loader  = new THREE.TextureLoader()
    var material = new THREE.MeshBasicMaterial({ color: 0x00002B, side: THREE.BackSide});
    skyDome = new THREE.Mesh(geometry, material);
    skyDome.rotation.x = -Math.PI/2;
    scene.add(skyDome);
}

function createCasa(){
// Create materials
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const windowDoorMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });

    /***********************************************************
                            WALLS
     **********************************************************/
    const geoWalls = new THREE.BufferGeometry();

    const vertWalls = new Float32Array(
        [
        //front
            -10.0, 0.0, 5.0,
            10.0, 0.0, 5.0,
            10.0, 11.0, 5.0,
            -10.0, 11.0, 5.0,
        //back
            -10.0, 0.0, -5.0,
            10.0, 0.0, -5.0,
            10.0, 11.0, -5.0,
            -10.0, 11.0, -5.0,
        //left
            -10.0, 0.0, -5.0,
            -10.0, 0.0, 5.0,
            -10.0, 11.0, 5.0,
            -10.0, 11.0, -5.0,
        //right
            10.0, 0.0, 5.0,
            10.0, 0.0, -5.0,
            10.0, 11.0, -5.0,
            10.0, 11.0, 5.0,
        //top
            -10.0, 11.0, 5.0,
            10.0, 11.0, 5.0,
            10.0, 11.0, -5.0,
            -10.0, 11.0, -5.0,
        //bottom
            -10.0, 0.0, -5.0,
            10.0, 0.0, -5.0,
            10.0, 0.0, 5.0,
            -10.0, 0.0, 5.0,
        ] );
    const indWalls = [
        //front
        0, 1, 2, 2, 3, 0,
        //back
        6, 5 , 4 , 4 , 7 ,6,
        //left
        8 , 9, 10, 10, 11, 8,
        //right
        12, 13, 14, 14, 15, 12,
        //top
        16, 17, 18, 18 , 19, 16,
        //bottom
        20, 21, 22, 22, 23, 20];

    geoWalls.setAttribute('position', new THREE.BufferAttribute(vertWalls, 3));

    geoWalls.setIndex( indWalls );
    geoWalls.computeVertexNormals();
    /***********************************************************
                            ROOF
     **********************************************************/
    const geoRoof = new THREE.BufferGeometry();

    const vertRoof = new Float32Array(
        [
            //top
            -10.0, 11.0, 5.0,
            10.0, 11.0, 5.0,
            10.0, 11.0, -5.0,
            -10.0, 11.0, -5.0,
            -10.0, 16.0, 0.0,
            10.0,  16.0, 0.0,
        ] );
    const indRoof = [
        //front
        0, 1, 5, 5, 4, 0,
        //back
        2, 3 , 4 , 4 , 5 ,2,
        //left
        3, 0, 4,
        //right
        1, 2, 5
        ];

    geoRoof.setAttribute('position', new THREE.BufferAttribute(vertRoof, 3));

    geoRoof.setIndex( indRoof );
    geoRoof.computeVertexNormals();
    /***********************************************************
                            Door
     **********************************************************/
    const geoDoor = new THREE.BufferGeometry();

    const vertDoor = new Float32Array(
        [
            -7, 0.0, 5.001,
            -5, 0.0, 5.001,
            -5, 4,   5.001,
            -7, 4,   5.001,
        ] );
    const indDoor = [
        //front
        0, 1, 2, 2, 3, 0
    ];

    geoDoor.setAttribute('position', new THREE.BufferAttribute(vertDoor , 3));

    geoDoor.setIndex( indDoor );
    geoDoor.computeVertexNormals();
    /***********************************************************
                        Windows
     **********************************************************/
    const geoWindows = new THREE.BufferGeometry();

    const vertWindows = new Float32Array(
        [
            //Front Left window
            -8, 7.0, 5.001,
            -4, 7.0, 5.001,
            -4, 10.0,   5.001,
            -8, 10.0,   5.001,
            //Front Right window
            0, 7.0, 5.001,
            7, 7.0, 5.001,
            7, 10.0,   5.001,
            0, 10.0,   5.001,
            //Right Window
            10.001, 8.0, 4.0,
            10.001, 8.0, 0.0,
            10.001, 10.0, 0.0,
            10.001, 10.0, 4.0,
        ] );
    const indWindows = [
        //front left
        0, 1, 2, 2, 3, 0,
        //front right
        4, 5, 6, 6, 7, 4,
        8, 9 , 10, 10 ,11 , 8
    ];

    geoWindows.setAttribute('position', new THREE.BufferAttribute(vertWindows , 3));

    geoWindows.setIndex( indWindows );
    geoWindows.computeVertexNormals();
    /***********************************************************
                        Chimney
     **********************************************************/
    const geoChimney = new THREE.BufferGeometry();

    const vertChimney = new Float32Array(
        [
        //front
            4.0, 11.0, 4.0,
            6.0, 11.0, 4.0,
            6.0, 17.0, 4.0,
            4.0, 17.0, 4.0,
        //back
            4.0, 11.0, 2.0,
            6.0, 11.0, 2.0,
            6.0, 17.0, 2.0,
            4.0, 17.0, 2.0,
        //left
            4.0, 11.0, 2.0,
            4.0, 11.0, 4.0,
            4.0, 17.0, 4.0,
            4.0, 17.0, 2.0,
        //right
            6.0, 11.0, 4.0,
            6.0, 11.0, 2.0,
            6.0, 17.0, 2.0,
            6.0, 17.0, 4.0,
        //top
            4.0, 17.0, 4.0,
            6.0, 17.0, 4.0,
            6.0, 17.0, 2.0,
            4.0, 17.0, 2.0,
        //bottom
            4.0, 11.0, 2.0,
            6.0, 11.0, 2.0,
            6.0, 11.0, 4.0,
            4.0, 11.0, 4.0,
        ] );
    const indChimney = [
        //front
        0, 1, 2, 2, 3, 0,
        //back
        6, 5 , 4 , 4 , 7 ,6,
        //left
        8 , 9, 10, 10, 11, 8,
        //right
        12, 13, 14, 14, 15, 12,
        //top
        16, 17, 18, 18 , 19, 16,
        //bottom
        20, 21, 22, 22, 23, 20];

    geoChimney.setAttribute('position', new THREE.BufferAttribute(vertChimney, 3));

    geoChimney.setIndex( indChimney );
    geoChimney.computeVertexNormals();
// Create meshes for each element
    const walls = new THREE.Mesh(geoWalls, wallMaterial);
    const roof = new THREE.Mesh(geoRoof, roofMaterial);
    const door = new THREE.Mesh(geoDoor, windowDoorMaterial);
    const windows = new THREE.Mesh(geoWindows, windowDoorMaterial);
    const chimney = new THREE.Mesh(geoChimney, windowDoorMaterial);


// Add elements to the scene
    scene.add(walls);
    scene.add(roof);
    scene.add(door);
    scene.add(windows);
    scene.add(chimney);
}

function createGround() {
    'use strict';
    const geometry = new THREE.PlaneGeometry(1000, 1000);
    var loader  = new THREE.TextureLoader()
    var heightMap = loader.load( 'js/heighmap.png' );
    var material = new THREE.MeshPhongMaterial({ displacementMap: heightMap, emissiveIntensity: 1, side: THREE.DoubleSide, color: 0x00A619});
    var ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI/2;
    scene.add(ground);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    axisHelper = new THREE.AxisHelper(50);
    scene.add(axisHelper);
    ovni = new Ovni();
    ovni.scale.set(2, 2, 2);
    scene.add(ovni);
    createCasa();
    createSkyDome();
    createGround();
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
}


////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////



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
    
    if (!changedWireframes && wireframes) {
        ovni.wireframes();
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
    
    
    case 54:   // tecla 6
        wireframes = true;
        break;
    case 65: //A
    case 97: //a
        feetDown = true;
        break;
    case 70:  //F
    case 102: //f
        headDown = true;
        break;
    case 82:  //R
    case 114: //r
        headUp = true;
        break;
    case 68:  //D
    case 100: //d
        armsDown = true;
        break;
    case 69:  //E
    case 101: //e
        armsUp = true;
        break;
    case 81:  //Q
    case 113: //q
        feetUp = true;
        break;
    case 83:  //S
    case 115: //s
        legsDown = true;
        break;
    case 87:  //W
    case 119: //w
        legsUp = true;
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
    case 65: //A
    case 97: //a
        feetDown = false;
        break;
    case 70:  //F
    case 102: //f
        headDown = false;
        break;
    case 82:  //R
    case 114: //r
        headUp = false;
        break;
    case 68:  //D
    case 100: //d
        armsDown = false;
        break;
    case 69:  //E
    case 101: //e
        armsUp = false;
        break;
    case 81:  //Q
    case 113: //q
        feetUp = false;
        break;
    case 83:  //S
    case 115: //s
        legsDown = false;
        break;
    case 87:  //W
    case 119: //w
        legsUp = false;
        break;
    }
    
}
/*global THREE, requestAnimationFrame, console*/

var scene, renderer;

var camera, cameraPerspectiva, cameraTopo, cameraLateral, cameraFrontal, cameraOrtogonal;
var cameraFactor = 7;

var robot, trailer;
var robotBoundingBox, trailerBoundingBox;
var axisHelper;
var collision = false;
var left = false, right = false, up = false, down = false;
var wireframes = false, changedWireframes = false;

//Câmaras

function createCameraPerspectiva() {
    'use strict';
    cameraPerspectiva = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspectiva.position.x = 80;
    cameraPerspectiva.position.y = 0;
    cameraPerspectiva.position.z = 80;
    cameraPerspectiva.lookAt(scene.position);
}

function createCameraTopo() {
    'use strict';
    cameraTopo = new THREE.OrthographicCamera(window.innerWidth*1.2 / -cameraFactor, window.innerWidth*1.2 / cameraFactor, window.innerHeight*1.2 / cameraFactor, window.innerHeight*1.2 / -cameraFactor, 1, 1000);
    cameraTopo.position.x = 0;
    cameraTopo.position.y = 50;
    cameraTopo.position.z = 0;
    cameraTopo.lookAt(scene.position);
}

function createCameraLateral() {
    'use strict';
    cameraLateral = new THREE.OrthographicCamera(window.innerWidth*0.8 / -cameraFactor,
                                         window.innerWidth*0.8 / cameraFactor,
                                         window.innerHeight*0.8 / cameraFactor,
                                         window.innerHeight*0.8 / -cameraFactor,
                                         1,
                                         1000);
    cameraLateral.position.x = 50;
    cameraLateral.position.y = 0;
    cameraLateral.position.z = 0;
    cameraLateral.lookAt(scene.position);
}

function createCameraFrontal() {
    'use strict';
    cameraFrontal = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraFrontal.position.x = 0;
    cameraFrontal.position.y = 0;
    cameraFrontal.position.z = 50;
    cameraFrontal.lookAt(scene.position);
}

function createCameraOrtogonal() {
    'use strict';
    cameraOrtogonal = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
                                         1,
                                         1000);
    cameraOrtogonal.position.x = 120;
    cameraOrtogonal.position.y = 0;
    cameraOrtogonal.position.z = -120;
    cameraOrtogonal.lookAt(scene.position);
}

function checkCollision() {
    if (truck)
        console.log("true");
    tX_min = -torsoX/2-0;
    tX_max = 0;
    tZ = 0;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    axisHelper = new THREE.AxisHelper(50);
    scene.add(axisHelper);
    robot = new Robot();
    trailer = createTrailer();
    scene.add(robot);
    scene.add(trailer);

}

function createMesh(geometry, color) {
    robot.materials.push(new THREE.MeshBasicMaterial({ color: color, wireframe: false }));
    return new THREE.Mesh(geometry, robot.materials[robot.materials.length-1]);
}

function createTrailer() {
    'use strict';

    trailer = new THREE.Object3D();
    trailer.position.set(0, -torsoY/2-abdomenY, -torsoZ*2);

    var weel1 = createMesh(new THREE.CylinderGeometry(weelsZ/2, weelsZ/2, weelsX, 20), 0x000055);
    weel1.rotation.z = Math.PI/2;
    var weel2 = weel1.clone(), weel3 = weel1.clone();
    var weel4 = weel1.clone();
    
    var trailer1 = createMesh(new THREE.CubeGeometry(trailerX, trailerY, trailerZ), 0x000000);
    trailer1.position.set(0, trailerY/2, -trailerZ);
    
    var exaust = createMesh(new THREE.CubeGeometry(escapeX,escapeY,escapeZ), 0x890123);
    exaust.position.set(0, -escapeY/2, -3*trailerZ/2+escapeZ/2);

    weel1.position.set(-waistX/2-weelsX/2 , -3*waistY/4, -3*trailerZ/2+weelsZ/2);
    weel2.position.set(+waistX/2+weelsX/2 , -3*waistY/4, -3*trailerZ/2+weelsZ/2);

    weel3.position.set(+waistX/2+weelsX/2 , -3*waistY/4, -3*trailerZ/2+3*weelsZ/2+1);
    weel4.position.set(+waistX/2+weelsX/2 , -3*waistY/4, -3*trailerZ/2+3*weelsZ/2+1);

    trailer.add(weel1, weel2, weel3, weel4);
    trailer.add(trailer1, exaust);
    return trailer;
}

function moveTrailer() {
    if (up)
        trailer.position.add(new THREE.Vector3(0, 0, 0.5));
    if (down)
        trailer.position.add(new THREE.Vector3(0, 0, -0.5));
    if (right)
        trailer.position.add(new THREE.Vector3(0.5, 0, 0));
    if (left)
        trailer.position.add(new THREE.Vector3(-0.5, 0, 0));
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

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
    
    case 49:   // tecla 1
        camera = cameraFrontal;
        break;
    case 50:   // tecla 2
        camera = cameraLateral;
        break;
    case 51:    // tecla 3
        camera = cameraTopo;
        break;
    case 52:   // tecla 4
        camera = cameraOrtogonal;
        break;
    case 53:   // tecla 5
        camera = cameraPerspectiva;
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

function render() {
    'use strict';
    renderer.render(scene, camera);
    renderer.setClearColor(0xffffff, 1);
}

function update() {
    'use strict';
    robot.move();
    if (up || left || right || down)
        moveTrailer();
    if (!changedWireframes && wireframes) {
        robot.wireframes();
        changedWireframes = true;
    }
    collision = robotBoundingBox.intersectsBox(trailerBoundingBox);
    if (checkCollision()) 
        console.log("here");
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();

    createCameraOrtogonal();
    createCameraFrontal();
    createCameraLateral();
    createCameraTopo();
    createCameraPerspectiva();

    robotBoundingBox = new THREE.Box3().setFromObject(robot);
    trailerBoundingBox = new THREE.Box3().setFromObject(trailer);

    camera = cameraPerspectiva;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    update();
    render();
    requestAnimationFrame(animate);
}

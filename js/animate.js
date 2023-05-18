/*global THREE, requestAnimationFrame, console*/

var scene, renderer;

var camera, cameraPerspectiva, cameraTopo, cameraLateral, cameraFrontal, cameraOrtogonal;
var changeCameraTopo = false;
var changeCameraFrontal = false;
var changeCameraLateral = false;
var changeCameraPerspectiva = false;
var changeCameraOrtogonal = false;
var cameraFactor = 7;

var geometry, material, mesh;

var ball;


//Câmaras

function createCameraPerspectiva() {
    'use strict';
    cameraPerspectiva = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraPerspectiva.position.x = 50;
    cameraPerspectiva.position.y = 0;
    cameraPerspectiva.position.z = 50;
    cameraPerspectiva.lookAt(scene.position);
}

function createCameraTopo() {
    'use strict';
    cameraTopo = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor, window.innerWidth / cameraFactor, window.innerHeight / cameraFactor, window.innerHeight / -cameraFactor, 1, 1000);
    cameraTopo.position.x = 0;
    cameraTopo.position.y = 50;
    cameraTopo.position.z = 0;
    cameraTopo.lookAt(scene.position);
}

function createCameraLateral() {
    'use strict';
    cameraLateral = new THREE.OrthographicCamera(window.innerWidth / -cameraFactor,
                                         window.innerWidth / cameraFactor,
                                         window.innerHeight / cameraFactor,
                                         window.innerHeight / -cameraFactor,
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
    cameraOrtogonal.position.x = 50;
    cameraOrtogonal.position.y = 0;
    cameraOrtogonal.position.z = -50;
    cameraOrtogonal.lookAt(scene.position);
}




function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CubeGeometry(2, 6, 2);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(60, 2, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createBall(x, y, z) {
    'use strict';

    ball = new THREE.Object3D();
    ball.userData = { jumping: true, step: 0 };

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);

    ball.add(mesh);
    ball.position.set(x, y, z);

    scene.add(ball);
}


function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addTableTop(table, 0, 0, 0);
    addTableLeg(table, -25, -1, -8);
    addTableLeg(table, -25, -1, 8);
    addTableLeg(table, 25, -1, 8);
    addTableLeg(table, 25, -1, -8);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    scene.add(new Robo());
    createTable(0, 8, 0);
    createBall(0, 0, 15);


    createCameraPerspectiva();
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function checkCamera(){
    if(changeCameraFrontal){
        camera = cameraFrontal;
        changeCameraFrontal = false;
    }
    else if(changeCameraLateral){
        camera = cameraLateral;
        changeCameraLateral = false;
    }
    else if(changeCameraTopo){
        camera = cameraTopo;
        changeCameraTopo = false;
    }
    else if(changeCameraPerspectiva){
        camera = cameraPerspectiva;
        changeCameraPerspectiva = false;
    }
    else if(changeCameraOrtogonal){
        camera = cameraOrtogonal;
        changeCameraOrtogonal = false;
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
    
    case 49:   // tecla 1
        changeCameraFrontal = true;
        break;
    case 50:   // tecla 2
        changeCameraLateral = true;
        break;
    case 51:    // tecla 3
        changeCameraTopo = true;
        break;
    case 52:   // tecla 4
        changeCameraPerspectiva = true;
        break;
    case 53:   // tecla 5
        changeCameraOrtogonal = true;
        break;
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 83:  //S
    case 115: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }
}


function render() {
    'use strict';
    renderer.render(scene, camera);
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

    camera = cameraPerspectiva;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }

    checkCamera();

    render();

    requestAnimationFrame(animate);
}

/*global THREE, requestAnimationFrame, console*/

var scene, renderer;

var camera, cameraPerspectiva, cameraTopo, cameraLateral, cameraFrontal, cameraOrtogonal;
var changeCameraTopo = false;
var changeCameraFrontal = false;
var changeCameraLateral = false;
var changeCameraPerspectiva = false;
var changeCameraOrtogonal = false;
var cameraFactor = 7;

var robo;
var axisHelper;


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


function createScene() {
    'use strict';

    scene = new THREE.Scene();

    axisHelper = new THREE.AxisHelper(50);
    scene.add(axisHelper);
    robo = new Robo();
    scene.add(robo);

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
        robo.wireframes();
        break;
    case 83:  //S
    case 115: //s
        robo.rotateHead();
        break;
    case 69:  //E
    case 101: //e
        axisHelper.visible = !axisHelper.visible;
        break;
    }
}


function render() {
    'use strict';
    renderer.render(scene, camera);
    renderer.setClearColor(0xffffff, 1);
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

    checkCamera();

    render();

    requestAnimationFrame(animate);
}

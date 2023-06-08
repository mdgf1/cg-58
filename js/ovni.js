// vars
var left = false, right = false, up = false, down = false;

// Consts
const bodyXZ = 21;
const bodyY = 9;

const cockPitXYZ = 8;

const bigLightXZ = 8;
const bigLightY = 6;

const smallLightXYZ = 2;

class Ovni extends THREE.Object3D {

    body;
    cockPit;
    bigLight;
    smallLights;
    materials = [];

    constructor() {
        super();
        this.createBody();
        this.createCockPit();
        this.createBigLight();
        this.createSmallLights();
        this.position.set(0, 75, 0);
    }

    createBody() {
        'use strict';
        this.body = new THREE.Object3D();
        var geometry = new THREE.SphereGeometry(1);
        geometry.scale(bodyXZ/2, bodyY/2, bodyXZ/2);
        this.body.add(this.createMesh(geometry, 0xF0E68C));
        this.add(this.body);
    }

    createCockPit() {
        'use strict';
        this.cockPit = new THREE.Object3D();
        this.cockPit.position.set(0, bodyY/2, 0);
        this.cockPit.add(this.createMesh(new THREE.SphereGeometry(cockPitXYZ/2), 0xDCDCDC));
        this.add(this.cockPit);
        
    }
    createBigLight() {
        'use strict';
        this.bigLight = new THREE.Object3D();
        this.bigLight.position.set(0, -bodyY/3, 0);
        this.bigLight.add(this.createMesh(new THREE.CylinderGeometry(bigLightXZ/2, bigLightXZ/2, bigLightY, 40), 0xFFFFE0));
        this.add(this.bigLight);
        var spotlight = new THREE.SpotLight(0xFFFFFF, 4, 100, Math.PI/10, 0.5);
        spotlight.position.set(0, -bigLightY/2, 0);
        spotlight.target.position.set(0, -bigLightY, 0);
        this.bigLight.add(spotlight);
        this.bigLight.add(spotlight.target);
    }
    createSmallLights() {
        'use strict';
        this.smallLights = new THREE.Object3D();
        this.smallLights.position.set(0, -bodyY/3, 0);
        var geometry = new THREE.SphereGeometry(smallLightXYZ/2);
        var leftLight = this.createMesh(geometry, 0xFF7377);
        var rightLight = leftLight.clone();
        var frontLight = leftLight.clone();
        var backLight = leftLight.clone();
        leftLight.position.set(-bigLightXZ, 0, 0);
        rightLight.position.set(bigLightXZ, 0, 0);
        frontLight.position.set(0, 0, bigLightXZ);
        backLight.position.set(0, 0, -bigLightXZ);
        this.smallLights.add(leftLight, rightLight, frontLight, backLight);
        this.add(this.smallLights);
    }

    move() {
        this.rotation.y += Math.PI/45;
        var vectorSize = 3;
        if (up && right || up && left || down && right || down && left)
            vectorSize = 1.5;
        if (up)
            this.position.add(new THREE.Vector3(0, 0, vectorSize));
        if (down)
            this.position.add(new THREE.Vector3(0, 0, -vectorSize));
        if (right)
            this.position.add(new THREE.Vector3(vectorSize, 0, 0));
        if (left)
            this.position.add(new THREE.Vector3(-vectorSize, 0, 0));
    }

    moveFeet() {
        if (feetUp && feetDown)
            return;
        else if (feetUp && this.feet.rotation.x > 0) {
            this.feet.rotation.x -= Math.PI/86;      
        }
        else if(feetDown && this.feet.rotation.x < Math.PI/2) {
            this.feet.rotation.x += Math.PI/86;
        }
        if (this.feet.rotation.x > Math.PI/2)   
            this.feet.rotation.x = Math.PI/2;
        if (this.feet.rotation.x < 0)   
            this.feet.rotation.x = 0; 
    }

    wireframes() {
        
        for (var i = 0; i < this.materials.length; i++) {
            this.materials[i].wireframe = !this.materials[i].wireframe;
        }
    }

    createMesh(geometry, color) {
        this.materials.push(new THREE.MeshBasicMaterial({ color: color, wireframe: false }));
        return new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
    }
}

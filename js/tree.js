// vars
var left = false, right = false, up = false, down = false;

// Consts
const bodyXZ = 21;
const bodyY = 9;

const cockPitXYZ = 8;

const bigLightXZ = 8;
const bigLightY = 6;

const smallLightXYZ = 2;

class Tree extends THREE.Object3D {

    mainTrunk;
    smallTrunks;
    smallBranches;
    mainTrunkMaterials = [];
    smallTrunkMaterials = [];
    smallBranchMaterials = [];

    constructor() {
        super();
        this.createMainTrunk();
        this.createSmallTrunks();
        this.createSmallBranchs();
    }

    createMainTrunk() {
        'use strict';
        this.mainTrunk = new THREE.Object3D();
        var geometry = new THREE.SphereGeometry(1);
        geometry.scale(bodyXZ/2, bodyY/2, bodyXZ/2);
        var color = 0x654321;
        this.mainTrunkMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.mainTrunkMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.mainTrunkMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.mainTrunkMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.mainTrunkMaterials.push(this.mainTrunkMaterials[2]);
        this.mainTrunk.add(new THREE.Mesh(geometry, this.mainTrunkMaterials[2]));
        this.add(this.mainTrunk);
    }

    createSmallTrunks() {
        'use strict';
        this.smallTrunks = new THREE.Object3D();
        this.smallTrunks.position.set(0, bodyY/2, 0);
        var color = 0x9f6934;
        this.smallTrunkMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.smallTrunkMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.smallTrunkMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.smallTrunkMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.smallTrunkMaterials.push(this.smallTrunkMaterials[2]);
        this.smallBranch1.add(new THREE.Mesh(new THREE.SphereGeometry(cockPitXYZ/2), this.smallTrunkMaterials[2]));
        this.add(this.cockPit);
        
    }

    createSmallBranchs() {
        'use strict';
        this.bigLight = new THREE.Object3D();
        this.bigLight.position.set(0, -bodyY/3, 0);
        var color = 0xFFFFE0;
        this.bigLightMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.bigLightMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.bigLightMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.bigLightMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.bigLightMaterials.push(this.bigLightMaterials[2]);
        this.bigLight.add(new THREE.Mesh(new THREE.CylinderGeometry(bigLightXZ/2, bigLightXZ/2, bigLightY, 40), this.bigLightMaterials[2]));
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

        var color = 0xFF7377;
        this.smallLightsMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.smallLightsMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.smallLightsMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.smallLightsMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.smallLightsMaterials.push(this.smallLightsMaterials[2]);
        var leftLight = new THREE.Mesh(geometry, this.smallLightsMaterials[2]);
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
            vectorSize = Math.sqrt(4.5);
        if (up)
            this.position.add(new THREE.Vector3(0, 0, vectorSize));
        if (down)
            this.position.add(new THREE.Vector3(0, 0, -vectorSize));
        if (right)
            this.position.add(new THREE.Vector3(vectorSize, 0, 0));
        if (left)
            this.position.add(new THREE.Vector3(-vectorSize, 0, 0));
    }

    changeMaterials() {
        if (material0)
            this.changeMaterial(0);
        else if (material1)
            this.changeMaterial(1);
        else if (material2)
            this.changeMaterial(2);
        else if (material3)
            this.changeMaterial(3);
    }

    changeMaterial(material) {
        if (material == 0 && this.body.children[0].material != this.bodyMaterials[0]) {
            this.body.children[0].material = this.bodyMaterials[0];
            this.cockPit.children[0].material = this.cockPitMaterials[0];
            this.bigLight.children[0].material = this.bigLightMaterials[0];
            for (var i = 0; i < this.smallLights.children.length; i++) 
                this.smallLights.children[i].material = this.smallLightsMaterials[0];
            return;
        } else if (material == 0 && this.body.children[0].material == this.bodyMaterials[0]) {
            this.body.children[0].material = this.bodyMaterials[4];
            this.cockPit.children[0].material = this.cockPitMaterials[4];
            this.bigLight.children[0].material = this.bigLightMaterials[4];
            for (var i = 0; i < this.smallLights.children.length; i++)
                this.smallLights.children[i].material = this.smallLightsMaterials[4];
            return;
        }
        this.bodyMaterials[4] = this.bodyMaterials[material];
        this.cockPitMaterials[4] = this.cockPitMaterials[material];
        this.bigLightMaterials[4] = this.bigLightMaterials[material];
        this.smallLightsMaterials[4] = this.smallLightsMaterials[material];
        this.body.children[0].material = this.bodyMaterials[4];
        this.cockPit.children[0].material = this.cockPitMaterials[4];
        this.bigLight.children[0].material = this.bigLightMaterials[4];
        for (var i = 0; i < this.smallLights.children.length; i++) {
            this.smallLights.children[i].material = this.smallLightsMaterials[4];
        }
    }
    wireframes() {
        
        for (var i = 0; i < this.bodyMaterials.length - 1; i++) {
            this.bodyMaterials[i].wireframe = !this.bodyMaterials[i].wireframe;
        }
        for (var i = 0; i < this.cockPitMaterials.length - 1; i++) {
            this.cockPitMaterials[i].wireframe = !this.cockPitMaterials[i].wireframe;
        }
        for (var i = 0; i < this.bigLightMaterials.length - 1; i++) {
            this.bigLightMaterials[i].wireframe = !this.bigLightMaterials[i].wireframe;
        }
        for (var i = 0; i < this.smallLightsMaterials.length - 1; i++) {
            this.smallLightsMaterials[i].wireframe = !this.smallLightsMaterials[i].wireframe;
        }
    }
}

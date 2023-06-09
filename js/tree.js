// vars
var left = false, right = false, up = false, down = false;

// Consts
const trunkX = 6;
const trunkY = 12;

const smallTrunksX = 3;
const smallTrunksY = 14;

const smallBranchX = 10;
const smallBranchY = 4;

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
        this.createSmallBranches();
    }

    createMainTrunk() {
        'use strict';
        this.mainTrunk = new THREE.Object3D();
        var geometry = new THREE.CylinderGeometry(trunkX/2, trunkX/2, trunkY, 30);

        var color = 0x654321;
        this.mainTrunkMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.mainTrunkMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.mainTrunkMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.mainTrunkMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.mainTrunkMaterials.push(this.mainTrunkMaterials[2]);
        this.mainTrunk.add(new THREE.Mesh(geometry, this.mainTrunkMaterials[2]));
        this.mainTrunk.position.set(0, trunkY/2, 0);
        this.add(this.mainTrunk);
    }

    createSmallTrunks() {
        'use strict';
        this.smallTrunks = new THREE.Object3D();
        this.smallTrunks.position.set(0, bodyY/2, 0);
        var geometry = new THREE.CylinderGeometry(smallTrunksX/2, smallTrunksX/2, smallTrunksY, 30);
        var color = 0x9f6934;
        this.smallTrunkMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.smallTrunkMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.smallTrunkMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.smallTrunkMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.smallTrunkMaterials.push(this.smallTrunkMaterials[2]);
        var smallTrunk1 = new THREE.Mesh(geometry, this.smallTrunkMaterials[2]);
        var smallTrunk2 = smallTrunk1.clone();
        var smallTrunk3 = smallTrunk1.clone();
        smallTrunk1.position.set(4, trunkY, 0);
        smallTrunk2.position.set(-4, trunkY, 0);
        smallTrunk3.position.set(1, trunkY+2, -6);
        smallTrunk3.rotation.z = Math.PI/2;
        smallTrunk3.rotation.y = -Math.PI/4;
        smallTrunk1.rotation.z = -Math.PI/4;
        smallTrunk2.rotation.z = Math.PI/4;
        this.smallTrunks.add(smallTrunk1, smallTrunk2, smallTrunk3);
        this.add(this.smallTrunks);
    }

    createSmallBranches() {
        'use strict';
        this.smallBranches = new THREE.Object3D();
        this.smallBranches.position.set(0, -bodyY/3, 0);
        var geometry = new THREE.SphereGeometry(1);
        geometry.scale(smallBranchX/2, smallBranchY/2, smallBranchX/2);

        var color = 0x228B22;
        this.smallBranchMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.smallBranchMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.smallBranchMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.smallBranchMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.smallBranchMaterials.push(this.smallBranchMaterials[2]);
        var smallBranch1 = new THREE.Mesh(geometry, this.smallBranchMaterials[2]);
        var smallBranch2 = smallBranch1.clone();
        var smallBranch3 = smallBranch1.clone();
        smallBranch1.position.set(-10, trunkY+2*smallTrunksY/3+2, 0);
        smallBranch2.position.set(10, trunkY+smallTrunksY, 0);
        smallBranch3.position.set(-smallTrunksX/2-4, trunkY+smallTrunksY/2+2, -smallTrunksY+2);
        smallBranch1.rotation.z = Math.PI/4;
        smallBranch2.rotation.z = -Math.PI/5;
        smallBranch3.rotation.z = -Math.PI/2;
        smallBranch3.rotation.y = -Math.PI/6;
        this.smallBranches.add(smallBranch1, smallBranch2, smallBranch3);
        this.add(this.smallBranches);
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
        if (material == 0 && this.mainTrunk.children[0].material != this.mainTrunkMaterials[0]) {
            this.mainTrunk.children[0].material = this.mainTrunkMaterials[0];
            for (var i = 0; i < this.smallTrunks.children.length; i++)
                this.smallTrunks.children[i].material = this.smallTrunkMaterials[0];
            for (var i = 0; i < this.smallBranches.children.length; i++) 
                this.smallBranches.children[i].material = this.smallBranchMaterials[0];
            return;
        } else if (material == 0 && this.mainTrunk.children[0].material == this.mainTrunkMaterials[0]) {
            this.mainTrunk.children[0].material = this.mainTrunkMaterials[4];
            for (var i = 0; i < this.smallTrunks.children.length; i++)
                this.smallTrunks.children[i].material = this.smallTrunkMaterials[4];
            for (var i = 0; i < this.smallBranches.children.length; i++)
                this.smallBranches.children[i].material = this.smallBranchMaterials[4];
            return;
        }
        this.mainTrunkMaterials[4] = this.mainTrunkMaterials[material];
        this.smallTrunkMaterials[4] = this.smallTrunkMaterials[material];
        this.smallBranchMaterials[4] = this.smallBranchMaterials[material];
        this.mainTrunk.children[0].material = this.mainTrunkMaterials[4];
        for (var i = 0; i < this.smallTrunks.children.length; i++)
            this.smallTrunks.children[i].material = this.smallTrunkMaterials[4];
        for (var i = 0; i < this.smallBranches.children.length; i++)
            this.smallBranches.children[i].material = this.smallBranchMaterials[4];
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

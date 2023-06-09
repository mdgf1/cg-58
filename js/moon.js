// CONSTS
const moonXYZ = 40;

class Moon extends THREE.Object3D {
    
    materials = [];

    constructor() {
        super();
        this.createMoon();
        this.position.set(-200, 150, -125);
    }

    createMoon() {
        'use strict';
        var geometry = new THREE.SphereGeometry(1);
        geometry.scale(moonXYZ, moonXYZ, moonXYZ);
        var color = 0xFFFACD;
        this.materials.push(new THREE.MeshBasicMaterial({ color: color}));
        this.materials.push(new THREE.MeshLambertMaterial({ color: color}));
        this.materials.push(new THREE.MeshPhongMaterial({ color: color}));
        this.materials.push(new THREE.MeshToonMaterial({ color: color}));
        this.materials.push(this.materials[2]);
        var moon = new THREE.Mesh(geometry, this.materials[2]);
        this.add(moon);
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
        if (material == 0 && this.children[0].material != this.materials[0]) {
            this.children[0].material = this.materials[0];
            return;
        } else if (material == 0 && this.children[0].material == this.materials[0]) {
            this.children[0].material = this.materials[4];
            return;
        }
        this.materials[4] = this.materials[material];
        this.children[0].material = this.materials[4];
    }
}
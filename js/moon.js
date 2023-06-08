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
        this.materials.push(new THREE.MeshPhongMaterial({ color: color}));
        this.materials.push(new THREE.MeshLambertMaterial({ color: color}));
        this.materials.push(new THREE.MeshToonMaterial({ color: color}));
        var moon = new THREE.Mesh(geometry, this.materials[0]);
        this.add(moon);
    }
}
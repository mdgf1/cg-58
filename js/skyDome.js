// CONSTS
const skyDomeXYZ = 400;


class SkyDome extends THREE.Object3D {
    materials = [];

    constructor() {
        super();
        this.createSkyDome();
    }

    createSkyDome() {
        'use strict';
        
        const geometry = new THREE.SphereGeometry(skyDomeXYZ, 32, 16, 0, Math.PI); 
        var color = 0x00002B;
        this.materials.push(new THREE.MeshBasicMaterial({color: color, side: THREE.BackSide}));
        this.materials.push(new THREE.MeshPhongMaterial({color: color, side: THREE.BackSide}));
        this.materials.push(new THREE.MeshLambertMaterial({color: color, side: THREE.BackSide}));
        this.materials.push(new THREE.MeshToonMaterial({color: color, side: THREE.BackSide}));
        var skyDome = new THREE.Mesh(geometry, this.materials[0]);
        skyDome.rotation.x = -Math.PI/2;
        this.add(skyDome);
    }
}
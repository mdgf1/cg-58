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
        var skyDome = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0x00002B, side: THREE.BackSide}));
        skyDome.rotation.x = -Math.PI/2;
        this.add(skyDome);
    }
}
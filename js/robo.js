class Robo extends THREE.Object3D {
    // THREE Material
    material;

    constructor() {
        super();
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.createTorso(10, 10, 10);
    }

    // int x, int y, int z
    createTorso(x, y, z) {
        'use strict';
        geometry = new THREE.CubeGeometry(x, y, z);
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        this.add(mesh);
        return this;
    }
}
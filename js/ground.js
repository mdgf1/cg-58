

class Ground extends THREE.Object3D {
    constructor() {
        super();
        this.createGround();
    }

    createGround() {
        'use strict';
        const geometry = new THREE.PlaneGeometry(800, 800);
        var loader  = new THREE.TextureLoader()
        var heightMap = loader.load( 'heightmap.png' );
        var ground = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0x00A619, side: THREE.DoubleSide}));
        ground.rotation.x = -Math.PI/2;
        scene.add(ground);
    }
}
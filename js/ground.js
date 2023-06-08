

class Ground extends THREE.Object3D {
    materials = [];
    constructor() {
        super();
        this.createGround();
    }

    createGround() {
        'use strict';
        const geometry = new THREE.PlaneGeometry(800, 800);
        var loader  = new THREE.TextureLoader()
        var heightMap = loader.load( 'heightmap.png' );
        var color = 0x00A619;
        this.materials.push(new THREE.MeshStandardMaterial({ color: color, side: THREE.DoubleSide}));
        this.materials.push(new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide}));
        this.materials.push(new THREE.MeshLambertMaterial({ color: color, side: THREE.DoubleSide}));
        this.materials.push(new THREE.MeshToonMaterial({ color: color, side: THREE.DoubleSide}));
        var ground = new THREE.Mesh(geometry, this.materials[0]);
        ground.rotation.x = -Math.PI/2;
        scene.add(ground);
    }
}
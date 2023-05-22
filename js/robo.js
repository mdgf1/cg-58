// Consts
const torsoX = 34;
const torsoY = 16;
const torsoZ = 14;
const headX = 6;
const headY = 6;
const headZ = 6;


class Robo extends THREE.Object3D {

    torso;
    head;

    constructor() {
        super();
        this.createTorso();
        this.createHead();
    }

    // int x, int y, int z
    createTorso() {
        'use strict';
        var geometry = new THREE.CubeGeometry(torsoX, torsoY, torsoZ);
        this.torso = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false }));
        this.torso.position.set(0, 0, 0);
        this.add(this.torso);
    }

    // int x, int y, int z
    createHead() {
        'use strict';
        this.head = new THREE.Object3D();
        this.head.position.set(0, torsoY/2 + headY/2, 0);

        var geometry = new THREE.CubeGeometry(headX, headY, headZ);
        var head = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false }));
        geometry = new THREE.CubeGeometry(headX/3, headY, headZ/3);
        var antena1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000066, wireframe: false }));
        var antena2 = antena1.clone();
        head.position.set(0, 0, 0);
        antena1.position.set(headX/2 + headX/6, headY/3, 0);
        antena2.position.set(-headX/2 - headX/6, headY/3, 0);
        
        this.head.add(head);
        this.head.add(antena1);
        this.head.add(antena2);
        this.add(this.head);
    }

    rotateHead() {
        this.head.rotation.x += Math.PI/2;
    }

    wireframes() {
        this.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
    }
}
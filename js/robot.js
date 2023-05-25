// Consts
var headUp = false, headDown = false;
var torsoUp = false, torsoDown = false;
var armsUp = false, armsDown = false, armsRotated = false;
var legsUp = false, legsDown = false;
var feetUp = false, feetDown = false;

const torsoX = 34;
const torsoY = 16;
const torsoZ = 14;

const headX = 6;
const headY = 6;
const headZ = 6;

const foreArmsX = 6;
const foreArmsY = 20;
const foreArmsZ = 5;

const armsX = 6;
const armsY = 18;
const armsZ = 6;

const trailerX = 34;
const trailerY = 46;
const trailerZ = 96;

const escapeX = trailerX-12;
const escapeY = 8;
const escapeZ = 28;

class Robot extends THREE.Object3D {

    robotMode = [];
    head;
    torso;
    arms;
    foreArms;
    trailer;
    materials = [];

    constructor() {
        super();
        this.createHead();
        this.createTorso();
        this.createArms();
    }

    createHead() {
        'use strict';

        this.head = new THREE.Object3D();
        this.head.position.set(0, torsoY/2, 0);

        var geometry = new THREE.CubeGeometry(headX, headY, headZ);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: false }));
        var head = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);

        geometry = new THREE.CubeGeometry(headX/3, headY, headZ/3);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x000066, wireframe: false }));
        var antena1 = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        var antena2 = antena1.clone();

        geometry = new THREE.CubeGeometry(headX/3, headY/3, headZ/3);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false }));
        var eye1 = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        var eye2 = eye1.clone();

        head.position.set(0, headY/2, 0);
        antena1.position.set(headX/2 + headX/6, headY/3 + headY/2, 0);
        antena2.position.set(-headX/2 - headX/6, headY/3 + headY/2, 0);
        eye1.position.set(headX/3, headY/2, headZ/3);
        eye2.position.set(-headX/3, headY/2, headZ/3);
        
        this.head.add(head);
        this.head.add(antena1);
        this.head.add(antena2);
        this.head.add(eye1);
        this.head.add(eye2);
        this.add(this.head);
    }

    createTorso() {
        'use strict';
        var geometry = new THREE.CubeGeometry(torsoX, torsoY, torsoZ);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false }));
        this.torso = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        this.torso.position.set(0, 0, 0);
        this.add(this.torso);
    }

    createArms() {
        'use strict';
        this.arms = new THREE.Object3D();
        this.arms.position.set(0, torsoY/2, -torsoZ/2);
        this.foreArms = new THREE.Object3D();
        this.foreArms.position.set(0, -armsY, -armsZ/armsZ + armsZ/2);

        var geometry = new THREE.CubeGeometry(armsX, armsY, armsZ);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x789012, wireframe: false }));
        var leftArm = new THREE.Object3D();
        var rightArm = leftArm.clone();
        var literalLeftArm = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        var literalRightArm = literalLeftArm.clone();
        
        geometry = new THREE.CubeGeometry(armsX/3, 2*armsY/3, armsZ/3);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x890123, wireframe: false }));
        var leftBigExaust = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        var rightBigExaust = leftBigExaust.clone();

        geometry = new THREE.CubeGeometry(armsX/6, armsY/2, armsZ/6);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x0124365, wireframe: false }));
        var leftSmallExaust = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        var rightSmallExaust = leftSmallExaust.clone();

        geometry = new THREE.CubeGeometry(foreArmsX, foreArmsY, foreArmsZ);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x123456, wireframe: false }));
        var leftForeArm = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        var rightForeArm = leftForeArm.clone();

        literalLeftArm.position.set(torsoX/2+armsX/2, -torsoY/2-armsY/armsY, -armsZ/armsZ);
        literalRightArm.position.set(-torsoX/2-armsX/2, -torsoY/2-armsY/armsY, -armsZ/armsZ);

        leftBigExaust.position.set(torsoX/2+armsX/2+2*armsX/3, -torsoY/2-armsY/armsY, -armsZ/armsZ);
        rightBigExaust.position.set(-torsoX/2-armsX/2-2*armsX/3, -torsoY/2-armsY/armsY, -armsZ/armsZ);

        leftSmallExaust.position.set(torsoX/2+armsX+armsX/6, -torsoY/2-armsY/armsY+armsY/2, -armsZ/armsZ);
        rightSmallExaust.position.set(-torsoX/2-armsX-armsX/6, -torsoY/2-armsY/armsY+armsY/2, -armsZ/armsZ);

        leftForeArm.position.set(torsoX/2+armsX/2, -foreArmsY/2, -foreArmsZ/2);
        rightForeArm.position.set(-torsoX/2-armsX/2, -foreArmsY/2, -foreArmsZ/2);
        
        this.foreArms.add(leftForeArm);
        this.foreArms.add(rightForeArm);
        leftArm.add(literalLeftArm);
        rightArm.add(literalRightArm);
        leftArm.add(leftBigExaust);
        rightArm.add(rightBigExaust);
        leftArm.add(leftSmallExaust);
        rightArm.add(rightSmallExaust);
        this.arms.add(leftArm);
        this.arms.add(rightArm);
        this.arms.add(this.foreArms);
        this.add(this.arms);
        this.arms.rotation.x = -Math.PI/12;
        this.foreArms.rotation.x = -Math.PI/4;
    }
    
    createTrailer(){
        'use strict';

        this.trailer = new THREE.Object3D();
        this.trailer.position.set(0,0 , -torsoZ/2);
        
        var geometry = new THREE.CubeGeometry(trailerX, trailerY, trailerZ);1
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false }));
        var trailer = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        trailer.position.set(0,0,-trailerZ);
        
        geometry = new THREE.CubeGeometry(escapeX,escapeY,escapeZ);
        this.materials.push(new THREE.MeshBasicMaterial({ color: 0x890123, wireframe: false }));
        var escape = new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
        escape.position.set(0,-escapeY/2-trailerY/2,-3*trailerZ/2+escapeZ/2);

        this.trailer.add(trailer);
        this.trailer.add(escape);
        this.add(this.trailer);
    }

    move() {
        if (headDown || headUp)
            this.rotateHead();
        if (armsDown || armsUp)
            this.moveArms();
    }

    rotateHead() {
        if (headUp && headDown)
            return;
        else if (headUp && this.head.rotation.x < 0)
            this.head.rotation.x += Math.PI/48;
        else if(headDown && this.head.rotation.x > -Math.PI)
            this.head.rotation.x -= Math.PI/48;
    }

    // too cursed to go back now
    moveArms() {
        if (this.arms.rotation.x > 0 && this.foreArms.rotation.x < -Math.PI/2) 
            armsRotated = true;
        else 
            armsRotated = false;
        if (armsUp && armsDown)
            return;
        else if (armsUp) {
            if (armsRotated) {
                armsRotated = false;
                // left arm = this.arms.children[0]
                if (this.arms.children[0].position.x < 0) {
                    this.arms.children[0].position.x += 0.5;
                    this.arms.children[1].position.x -= 0.5;
                    armsRotated = true;
                } if (this.arms.children[0].position.z < 0) {
                    this.arms.children[0].position.z += 0.5;
                    this.arms.children[1].position.z += 0.5;
                    armsRotated = true;
                } if (this.arms.children[0].position.y > 0) {
                    this.arms.children[0].position.y -= 0.5;
                    this.arms.children[1].position.y -= 0.5;
                    armsRotated = true;
                } 
                // left forearm = this.arms.children[2].children[0]
                if (this.arms.children[2].children[0].position.x < torsoX/2+armsX/2) {
                    this.arms.children[2].children[0].position.x += 0.5;
                    this.arms.children[2].children[1].position.x -= 0.5;
                    armsRotated = true;
                } if (this.arms.children[2].children[0].position.z > -foreArmsZ/2) {
                    this.arms.children[2].children[0].position.z -= 0.5;
                    this.arms.children[2].children[1].position.z -= 0.5;
                    armsRotated = true;
                } if (this.arms.children[2].children[0].position.y > -foreArmsY/2) {
                    this.arms.children[2].children[0].position.y -= 0.5;
                    this.arms.children[2].children[1].position.y -= 0.5;
                    armsRotated = true;
                }
            } 
            if (!armsRotated) {
                if (this.arms.rotation.x > -Math.PI/12)
                    this.arms.rotation.x -= Math.PI/126;
                if (this.foreArms.rotation.x < -Math.PI/4)
                    this.foreArms.rotation.x += Math.PI/126;
            }
        } else if(armsDown) {
            if (armsRotated) {
                // move arms when fully rotated
                // left arm = this.arms.children[0]
                if (this.arms.children[0].position.x > -armsX) {
                    this.arms.children[0].position.x -= 0.5;
                    this.arms.children[1].position.x += 0.5;
                } if (this.arms.children[0].position.z > -armsZ/3) {
                    this.arms.children[0].position.z -= 0.5;
                    this.arms.children[1].position.z -= 0.5;
                } if (this.arms.children[0].position.y < armsY-torsoY) {
                    this.arms.children[0].position.y += 0.5;
                    this.arms.children[1].position.y += 0.5;
                } 
                // move forearms when fully rotated
                if (this.arms.children[2].children[0].position.x > torsoX/2-armsX/2) {
                    this.arms.children[2].children[0].position.x -= 0.5;
                    this.arms.children[2].children[1].position.x += 0.5;
                } if (this.arms.children[2].children[0].position.z < -foreArmsZ/2+armsY-torsoY) {
                    this.arms.children[2].children[0].position.z += 0.5;
                    this.arms.children[2].children[1].position.z += 0.5;
                }if (this.arms.children[2].children[0].position.y < -foreArmsY/2+torsoZ-armsZ) {
                    this.arms.children[2].children[0].position.y += 0.5;
                    this.arms.children[2].children[1].position.y += 0.5;
                    armsRotated = true;
                }
            } else {
                if (this.arms.rotation.x < 0)
                    this.arms.rotation.x += Math.PI/126;
                if (this.foreArms.rotation.x > -Math.PI/2)
                    this.foreArms.rotation.x -= Math.PI/126;
            }
            
        }
    }

    wireframes() {
        for (var i = 0; i < this.materials.length; i++) {
            this.materials[i].wireframe = !this.materials[i].wireframe;
        }
    }
}

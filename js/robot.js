// Consts
var headUp = false, headDown = false;
var torsoUp = false, torsoDown = false;
var armsUp = false, armsDown = false, armsRotated = false;
var legsUp = false, legsDown = false;
var feetUp = false, feetDown = false;

const headX = 6;
const headY = 6;
const headZ = 6;

const torsoX = 34;
const torsoY = 16;
const torsoZ = 14;

const armsX = 6;
const armsY = 18;
const armsZ = 6;

const foreArmsX = 6;
const foreArmsY = 20;
const foreArmsZ = 5;

const abdomenX = 22;
const abdomenY = 8;
const abdomenZ = 14;

const waistX = 22;
const waistY = 8;
const waistZ = 8;

const legsX = 6;
const legsY = 8;
const legsZ = 6;

const foreLegsX = 10;
const foreLegsY = 36;
const foreLegsZ = 10;

const latcherX = 4;
const latcherY = 4;
const latcherZ = 1;

const feetX = 10;
const feetY = 4;
const feetZ = 6;

class Robot extends THREE.Object3D {

    robotMode = [];
    head;
    torso;
    arms;
    foreArms;
    abdomen;
    waist;
    legs;
    feet;
    materials = [];

    constructor() {
        super();
        this.createHead();
        this.createTorso();
        this.createArms();
        this.createAbdomen();
        this.createWaist();
        this.createLegs();
    }

    createHead() {
        'use strict';

        this.head = new THREE.Object3D();
        this.head.position.set(0, torsoY/2, 0);

        var head = this.createMesh(new THREE.CubeGeometry(headX, headY, headZ), 0xff00ff);

        var antena1 = this.createMesh(new THREE.CubeGeometry(headX/3, headY, headZ/3), 0x000066);
        var antena2 = antena1.clone();

        var eye1 = this.createMesh(new THREE.CubeGeometry(headX/3, headY/3, headZ/3), 0x00ff00); 
        var eye2 = eye1.clone();

        head.position.set(0, headY/2, 0);
        antena1.position.set(headX/2 + headX/6, headY/3 + headY/2, 0);
        antena2.position.set(-headX/2 - headX/6, headY/3 + headY/2, 0);
        eye1.position.set(headX/3, headY/2, headZ/3);
        eye2.position.set(-headX/3, headY/2, headZ/3);
        
        this.head.add(head, antena1, antena2, eye1, eye2);
        this.add(this.head);
    }

    createTorso() {
        'use strict';
        this.torso = this.createMesh(new THREE.CubeGeometry(torsoX, torsoY, torsoZ), 0xff0000);
        this.add(this.torso);
    }

    createArms() {
        'use strict';
        this.arms = new THREE.Object3D();
        this.arms.position.set(0, torsoY/2, -torsoZ/2);
        this.foreArms = new THREE.Object3D();
        this.foreArms.position.set(0, -armsY, -armsZ/armsZ + armsZ/2);

        var leftArm = new THREE.Object3D();
        var rightArm = leftArm.clone();
        var literalLeftArm = this.createMesh(new THREE.CubeGeometry(armsX, armsY, armsZ), 0x789012);
        var literalRightArm = literalLeftArm.clone();
        
        var leftBigExaust = this.createMesh(new THREE.CylinderGeometry(armsX/6, armsX/6, 2*armsY/3, 20), 0x890123);
        var rightBigExaust = leftBigExaust.clone();

        var leftSmallExaust = this.createMesh(new THREE.CylinderGeometry(armsX/12, armsX/12, armsY/2, 20), 0x0124365);
        var rightSmallExaust = leftSmallExaust.clone();

        var leftForeArm = this.createMesh(new THREE.CubeGeometry(foreArmsX, foreArmsY, foreArmsZ), 0x123456);
        var rightForeArm = leftForeArm.clone();

        literalLeftArm.position.set(torsoX/2+armsX/2, -torsoY/2-armsY/armsY, -armsZ/armsZ);
        literalRightArm.position.set(-torsoX/2-armsX/2, -torsoY/2-armsY/armsY, -armsZ/armsZ);

        leftBigExaust.position.set(torsoX/2+armsX/2+2*armsX/3, -torsoY/2-armsY/armsY, -armsZ/armsZ);
        rightBigExaust.position.set(-torsoX/2-armsX/2-2*armsX/3, -torsoY/2-armsY/armsY, -armsZ/armsZ);

        leftSmallExaust.position.set(torsoX/2+armsX+armsX/6, -torsoY/2-armsY/armsY+armsY/2, -armsZ/armsZ);
        rightSmallExaust.position.set(-torsoX/2-armsX-armsX/6, -torsoY/2-armsY/armsY+armsY/2, -armsZ/armsZ);

        leftForeArm.position.set(torsoX/2+armsX/2, -foreArmsY/2, -foreArmsZ/2);
        rightForeArm.position.set(-torsoX/2-armsX/2, -foreArmsY/2, -foreArmsZ/2);
        
        this.foreArms.add(leftForeArm, rightForeArm);
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

    createAbdomen() {
        'use strict';
        this.abdomen = this.createMesh(new THREE.CubeGeometry(abdomenX, abdomenY, abdomenZ), 0x154919);
        this.abdomen.position.set(0, -torsoY/2-abdomenY/2, 0);
        this.add(this.abdomen);
    }
    
    createWaist() {
        'use strict';
        this.waist = this.createMesh(new THREE.CubeGeometry(waistX, waistY, waistZ), 0x519491);
        this.waist.position.set(0, -torsoY/2-abdomenY-waistY/2, (abdomenZ-waistZ)/2);
        this.add(this.waist);
    }

    createLegs () {
        'use strict';
        this.legs = new THREE.Object3D();
        this.legs.position.set(0, -torsoY/2-abdomenY-3*waistY/4, legsZ/6);
        this.feet = new THREE.Object3D();
        this.feet.position.set(0, -waistY/4-legsY-17*foreLegsY/18, feetZ/2-legsZ/6);

        var leftLeg = this.createMesh(new THREE.CubeGeometry(legsX, legsY, legsZ), 0x098765);
        var rightLeg = leftLeg.clone();

        leftLeg.position.set(legsX, -legsY/2-waistY/4, -legsZ/6);
        rightLeg.position.set(-legsX, -legsY/2-waistY/4, -legsZ/6);
        
        var leftForeLeg = this.createMesh(new THREE.CubeGeometry(foreLegsX, foreLegsY, foreLegsZ), 0x993333);
        var rightForeLeg = leftForeLeg.clone();

        leftForeLeg.position.set(legsX, -legsY-waistY/4-foreLegsY/2, -legsZ/6);
        rightForeLeg.position.set(-legsX, -legsY-waistY/4-foreLegsY/2, -legsZ/6);

        var leftFoot = this.createMesh(new THREE.CubeGeometry(feetX, feetY, feetZ), 0x990099);
        var rightFoot = leftFoot.clone();

        leftFoot.position.set(legsX, 0, foreLegsZ/2);
        rightFoot.position.set(-legsX, 0, foreLegsZ/2);

        this.feet.add(leftFoot, rightFoot);
        this.legs.add(leftLeg, rightLeg);
        this.legs.add(leftForeLeg, rightForeLeg);
        this.legs.add(this.feet);
        this.add(this.legs);

    }

    move() {
        if (headDown || headUp)
            this.rotateHead();
        if (armsDown || armsUp)
            this.moveArms();
        if (legsDown || legsUp)
            this.moveLegs();
        if (feetDown || feetUp)
            this.moveFeet();
    }

    rotateHead() {
        if (headUp && headDown)
            return;
        else if (headUp && this.head.rotation.x < 0)
            this.head.rotation.x += Math.PI/48;
        else if(headDown && this.head.rotation.x > -Math.PI)
            this.head.rotation.x -= Math.PI/48;
        if (this.head.rotation.x > 0)   
            this.head.rotation.x = 0;
        if (this.head.rotation.x < -Math.PI)   
            this.head.rotation.x = -Math.PI; 
    }

    // too cursed to go back now
    moveArms() {
        if (this.arms.rotation.x >= 0 && this.foreArms.rotation.x <= -Math.PI/2) 
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
                if (this.foreArms.children[0].position.x < torsoX/2+armsX/2) {
                    this.foreArms.children[0].position.x += 0.5;
                    this.foreArms.children[1].position.x -= 0.5;
                    armsRotated = true;
                } if (this.foreArms.children[0].position.z > -foreArmsZ/2) {
                    this.foreArms.children[0].position.z -= 0.5;
                    this.foreArms.children[1].position.z -= 0.5;
                    armsRotated = true;
                } if (this.foreArms.children[0].position.y > -foreArmsY/2) {
                    this.foreArms.children[0].position.y -= 0.5;
                    this.foreArms.children[1].position.y -= 0.5;
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
                if (this.foreArms.children[0].position.x > torsoX/2-armsX/2) {
                    this.foreArms.children[0].position.x -= 0.5;
                    this.foreArms.children[1].position.x += 0.5;
                } if (this.foreArms.children[0].position.z < -foreArmsZ/2+armsY-torsoY) {
                    this.foreArms.children[0].position.z += 0.5;
                    this.foreArms.children[1].position.z += 0.5;
                }if (this.foreArms.children[0].position.y < -foreArmsY/2+torsoZ-armsZ) {
                    this.foreArms.children[0].position.y += 0.5;
                    this.foreArms.children[1].position.y += 0.5;
                    armsRotated = true;
                }
            } else {
                if (this.arms.rotation.x < 0)
                    this.arms.rotation.x += Math.PI/126;
                if (this.foreArms.rotation.x > -Math.PI/2)
                    this.foreArms.rotation.x -= Math.PI/126;
                if (this.arms.rotation.x > 0)
                    this.arms.rotation.x = 0;
                if (this.foreArms.rotation.x < -Math.PI/2)
                    this.foreArms.rotation.x = -Math.PI/2;
            }
            
        }
    }

    moveLegs() {
        if (legsUp && legsDown)
            return;
        else if (legsUp && this.legs.rotation.x > 0) {
            this.legs.rotation.x -= Math.PI/86;      
        }
        else if(legsDown && this.legs.rotation.x < Math.PI/2) {
            this.legs.rotation.x += Math.PI/86;
        }
        if (this.legs.rotation.x > Math.PI/2)   
            this.legs.rotation.x = Math.PI/2;
        if (this.legs.rotation.x < 0)   
            this.legs.rotation.x = 0; 
    }

    moveFeet() {
        if (feetUp && feetDown)
            return;
        else if (feetUp && this.feet.rotation.x > 0) {
            this.feet.rotation.x -= Math.PI/86;      
        }
        else if(feetDown && this.feet.rotation.x < Math.PI/2) {
            this.feet.rotation.x += Math.PI/86;
        }
        if (this.feet.rotation.x > Math.PI/2)   
            this.feet.rotation.x = Math.PI/2;
        if (this.feet.rotation.x < 0)   
            this.feet.rotation.x = 0; 
    }

    wireframes() {
        for (var i = 0; i < this.materials.length; i++) {
            this.materials[i].wireframe = !this.materials[i].wireframe;
        }
    }

    createMesh(geometry, color) {
        this.materials.push(new THREE.MeshBasicMaterial({ color: color, wireframe: false }));
        return new THREE.Mesh(geometry, this.materials[this.materials.length-1]);
    }
}
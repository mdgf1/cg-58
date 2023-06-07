// vars
var left = false, right = false, up = false, down = false;

// Consts
const bodyXZ = 21;
const bodyY = 9;

const cockPitXYZ = 8;

const bigLightXZ = 8;
const bigLightY = 6;

const smallLightXYZ = 1;

class Ovni extends THREE.Object3D {

    body;
    cockPit;
    bigLight;
    smallLights;
    materials = [];

    constructor() {
        super();
        this.position.set(0, 50, 0);
        this.createBody();
        this.createCockPit();
        this.createBigLight();
        this.createSmallLights();
    }

    createBody() {
        'use strict';
        this.body = new THREE.Object3D();
        var geometry = new THREE.SphereGeometry(1);
        geometry.scale(bodyXZ/2, bodyY/2, bodyXZ/2);
        this.body.add(this.createMesh(geometry, 0xF0E68C));
        this.add(this.body);
    }

    createCockPit() {
        'use strict';
        this.cockPit = new THREE.Object3D();
        this.cockPit.position.set(0, bodyY/2, 0);
        this.cockPit.add(this.createMesh(new THREE.SphereGeometry(cockPitXYZ/2), 0xDCDCDC));
        this.add(this.cockPit);
    }
    createBigLight() {
        'use strict';
        this.bigLight = new THREE.Object3D();
        this.bigLight.position.set(0, -bodyY/3, 0);
        this.bigLight.add(this.createMesh(new THREE.CylinderGeometry(bigLightXZ/2, bigLightXZ/2, bigLightY, 40), 0xFFFFE0));
        this.add(this.bigLight);
    }
    createSmallLights() {
        'use strict';
        this.smallLights = new THREE.Object3D();
        this.smallLights.position.set(0, -bodyY/3, 0);
        var geometry = new THREE.SphereGeometry(smallLightXYZ/2);
        var leftLight = this.createMesh(geometry, 0xFF7377);
        var rightLight = leftLight.clone();
        var frontLight = leftLight.clone();
        var backLight = leftLight.clone();
        leftLight.position.set(-bigLightXZ, 0, 0);
        rightLight.position.set(bigLightXZ, 0, 0);
        frontLight.position.set(0, 0, bigLightXZ);
        backLight.position.set(0, 0, -bigLightXZ);
        this.smallLights.add(leftLight, rightLight, frontLight, backLight);
        this.add(this.smallLights);
    }

    /* createLegs () {
        'use strict';
        this.legs = new THREE.Object3D();
        this.legs.position.set(0, -torsoY/2-abdomenY-3*waistY/4, legsZ/6);
        this.feet = new THREE.Object3D();
        this.feet.position.set(0, -waistY/4-legsY-17*foreLegsY/18, feetZ/2-legsZ/6);

        var leftLeg = new THREE.Object3D();
        var rightLeg = leftLeg.clone();

        var literalLeftLeg = this.createMesh(new THREE.BoxGeometry(legsX, legsY, legsZ), 0x098765);
        var literalRightLeg = literalLeftLeg.clone();

        literalLeftLeg.position.set(legsX, -legsY/2-waistY/4, -legsZ/6);
        literalRightLeg.position.set(-legsX, -legsY/2-waistY/4, -legsZ/6);
        
        var leftForeLeg = this.createMesh(new THREE.BoxGeometry(foreLegsX, foreLegsY, foreLegsZ), 0x993333);
        var rightForeLeg = leftForeLeg.clone();

        leftForeLeg.position.set(legsX, -legsY-waistY/4-foreLegsY/2, -legsZ/6);
        rightForeLeg.position.set(-legsX, -legsY-waistY/4-foreLegsY/2, -legsZ/6);

        var leftFoot = this.createMesh(new THREE.BoxGeometry(feetX, feetY, feetZ), 0x990099);
        var rightFoot = leftFoot.clone();

        leftFoot.position.set(legsX, 0, foreLegsZ/2);
        rightFoot.position.set(-legsX, 0, foreLegsZ/2);

        var leftLatcher = this.createMesh(new THREE.CylinderGeometry(latcherX/2, latcherX/2, latcherZ, 20, 1, false, 0, Math.PI), 0x990000);
        leftLatcher.rotation.x = Math.PI/2;
        var rightLatcher = leftLatcher.clone();
        rightLatcher.rotation.z = Math.PI;
        leftLatcher.position.set(latcherX/4, -waistY/4-legsY-latcherX/2-foreLegsY/2, -legsZ/6-foreLegsZ/2-latcherZ/2);
        rightLatcher.position.set(-latcherX/4, -waistY/4-legsY-latcherX/2-foreLegsY/2, -legsZ/6-foreLegsZ/2-latcherZ/2);

        leftLeg.add(literalLeftLeg, leftLatcher, leftForeLeg);
        rightLeg.add(literalRightLeg, rightLatcher, rightForeLeg);
        this.feet.add(leftFoot, rightFoot);
        this.legs.add(leftLeg);
        this.legs.add(rightLeg);
        this.legs.add(this.feet);
        this.add(this.legs);

    } */

    createWeels () {
        this.weels = new THREE.Object3D();
        var weel1 = this.createMesh(new THREE.CylinderGeometry(weelsZ/2, weelsZ/2, weelsX, 20), 0x000055);
        weel1.rotation.z = Math.PI/2;
        var weel2 = weel1.clone(), weel3 = weel1.clone();
        var weel4 = weel1.clone(), weel5 = weel1.clone();
        var weel6 = weel1.clone();

        weel1.position.set(waistX/2+weelsX/2 , -torsoY/2-abdomenY-3*waistY/4, weelsZ/12);
        weel2.position.set(-waistX/2-weelsX/2 , -torsoY/2-abdomenY-3*waistY/4, weelsZ/12);

        weel3.position.set(waistX/2+weelsX/2 , -torsoY-legsY-waistY/4, weelsZ/12-legsZ/6);
        weel4.position.set(-waistX/2-weelsX/2 , -torsoY-legsY-waistY/4, weelsZ/12-legsZ/6);

        weel5.position.set(+waistX/2+weelsX/2 , -legsY-waistY/4-foreLegsY+weelsZ/2, weelsZ/12-legsZ/6);
        weel6.position.set(-waistX/2-weelsX/2 , -legsY-waistY/4-foreLegsY+weelsZ/2, weelsZ/12-legsZ/6);

        this.legs.children[0].add(weel3, weel5);
        this.legs.children[1].add(weel4, weel6);
        this.weels.add(weel1, weel2);
        this.add(this.weels);
    }

    move() {
        ovni.rotation.y += Math.PI/45;
        if (up)
            ovni.position.add(new THREE.Vector3(0, 0, 0.5));
        if (down)
            ovni.position.add(new THREE.Vector3(0, 0, -0.5));
        if (right)
            ovni.position.add(new THREE.Vector3(0.5, 0, 0));
        if (left)
            ovni.position.add(new THREE.Vector3(-0.5, 0, 0));
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

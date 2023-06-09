
class House extends THREE.Object3D {
    wall;
    roof;
    door;
    windows;
    chimney;

    wallMaterials = [];
    windowDoorMaterials = [];
    roofMaterials = [];

    constructor() {
        super();
        this.createCasa();
    }

    createCasa(){

        // Create materials
        var color = 0xF5F5DC;
        this.wallMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.wallMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.wallMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.wallMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.wallMaterials.push(this.wallMaterials[2]);

        color = 0x0000ff;
        this.windowDoorMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.windowDoorMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.windowDoorMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.windowDoorMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.windowDoorMaterials.push(this.windowDoorMaterials[2]);

        color = 0xffa500;
        this.roofMaterials.push(new THREE.MeshBasicMaterial({color: color}));
        this.roofMaterials.push(new THREE.MeshLambertMaterial({color: color}));
        this.roofMaterials.push(new THREE.MeshPhongMaterial({color: color}));
        this.roofMaterials.push(new THREE.MeshToonMaterial({color: color}));
        this.roofMaterials.push(this.roofMaterials[2]);
    
        /***********************************************************
                                WALLS
            **********************************************************/
        const geoWalls = new THREE.BufferGeometry();
    
        const vertWalls = new Float32Array(
            [
            //front
                -10.0, 0.0, 5.0,
                10.0, 0.0, 5.0,
                10.0, 11.0, 5.0,
                -10.0, 11.0, 5.0,
            //back
                -10.0, 0.0, -5.0,
                10.0, 0.0, -5.0,
                10.0, 11.0, -5.0,
                -10.0, 11.0, -5.0,
            //left
                -10.0, 0.0, -5.0,
                -10.0, 0.0, 5.0,
                -10.0, 11.0, 5.0,
                -10.0, 11.0, -5.0,
            //right
                10.0, 0.0, 5.0,
                10.0, 0.0, -5.0,
                10.0, 11.0, -5.0,
                10.0, 11.0, 5.0,
            //top
                -10.0, 11.0, 5.0,
                10.0, 11.0, 5.0,
                10.0, 11.0, -5.0,
                -10.0, 11.0, -5.0,
            //bottom
                -10.0, 0.0, -5.0,
                10.0, 0.0, -5.0,
                10.0, 0.0, 5.0,
                -10.0, 0.0, 5.0,
            ] );
        const indWalls = [
            //front
            0, 1, 2, 2, 3, 0,
            //back
            6, 5 , 4 , 4 , 7 ,6,
            //left
            8 , 9, 10, 10, 11, 8,
            //right
            12, 13, 14, 14, 15, 12,
            //top
            16, 17, 18, 18 , 19, 16,
            //bottom
            20, 21, 22, 22, 23, 20];
    
        geoWalls.setAttribute('position', new THREE.BufferAttribute(vertWalls, 3));
    
        geoWalls.setIndex( indWalls );
        geoWalls.computeVertexNormals();
        /***********************************************************
                                ROOF
            **********************************************************/
        const geoRoof = new THREE.BufferGeometry();
    
        const vertRoof = new Float32Array(
            [
                //top
                -10.0, 11.0, 5.0,
                10.0, 11.0, 5.0,
                10.0, 11.0, -5.0,
                -10.0, 11.0, -5.0,
                -10.0, 16.0, 0.0,
                10.0,  16.0, 0.0,
            ] );
        const indRoof = [
            //front
            0, 1, 5, 5, 4, 0,
            //back
            2, 3 , 4 , 4 , 5 ,2,
            //left
            3, 0, 4,
            //right
            1, 2, 5
            ];
    
        geoRoof.setAttribute('position', new THREE.BufferAttribute(vertRoof, 3));
    
        geoRoof.setIndex( indRoof );
        geoRoof.computeVertexNormals();
        /***********************************************************
                                Door
            **********************************************************/
        const geoDoor = new THREE.BufferGeometry();
    
        const vertDoor = new Float32Array(
            [
                -7, 0.0, 5.001,
                -5, 0.0, 5.001,
                -5, 4,   5.001,
                -7, 4,   5.001,
            ] );
        const indDoor = [
            //front
            0, 1, 2, 2, 3, 0
        ];
    
        geoDoor.setAttribute('position', new THREE.BufferAttribute(vertDoor , 3));
    
        geoDoor.setIndex( indDoor );
        geoDoor.computeVertexNormals();
        /***********************************************************
                            Windows
            **********************************************************/
        const geoWindows = new THREE.BufferGeometry();
    
        const vertWindows = new Float32Array(
            [
                //Front Left window
                -8, 7.0, 5.001,
                -4, 7.0, 5.001,
                -4, 10.0,   5.001,
                -8, 10.0,   5.001,
                //Front Right window
                0, 7.0, 5.001,
                7, 7.0, 5.001,
                7, 10.0,   5.001,
                0, 10.0,   5.001,
                //Right Window
                10.001, 8.0, 4.0,
                10.001, 8.0, 0.0,
                10.001, 10.0, 0.0,
                10.001, 10.0, 4.0,
            ] );
        const indWindows = [
            //front left
            0, 1, 2, 2, 3, 0,
            //front right
            4, 5, 6, 6, 7, 4,
            8, 9 , 10, 10 ,11 , 8
        ];
    
        geoWindows.setAttribute('position', new THREE.BufferAttribute(vertWindows , 3));
    
        geoWindows.setIndex( indWindows );
        geoWindows.computeVertexNormals();
        /***********************************************************
                            Chimney
            **********************************************************/
        const geoChimney = new THREE.BufferGeometry();
    
        const vertChimney = new Float32Array(
            [
            //front
                4.0, 11.0, 4.0,
                6.0, 11.0, 4.0,
                6.0, 17.0, 4.0,
                4.0, 17.0, 4.0,
            //back
                4.0, 11.0, 2.0,
                6.0, 11.0, 2.0,
                6.0, 17.0, 2.0,
                4.0, 17.0, 2.0,
            //left
                4.0, 11.0, 2.0,
                4.0, 11.0, 4.0,
                4.0, 17.0, 4.0,
                4.0, 17.0, 2.0,
            //right
                6.0, 11.0, 4.0,
                6.0, 11.0, 2.0,
                6.0, 17.0, 2.0,
                6.0, 17.0, 4.0,
            //top
                4.0, 17.0, 4.0,
                6.0, 17.0, 4.0,
                6.0, 17.0, 2.0,
                4.0, 17.0, 2.0,
            //bottom
                4.0, 11.0, 2.0,
                6.0, 11.0, 2.0,
                6.0, 11.0, 4.0,
                4.0, 11.0, 4.0,
            ] );
        const indChimney = [
            //front
            0, 1, 2, 2, 3, 0,
            //back
            6, 5 , 4 , 4 , 7 ,6,
            //left
            8 , 9, 10, 10, 11, 8,
            //right
            12, 13, 14, 14, 15, 12,
            //top
            16, 17, 18, 18 , 19, 16,
            //bottom
            20, 21, 22, 22, 23, 20];
    
        geoChimney.setAttribute('position', new THREE.BufferAttribute(vertChimney, 3));
    
        geoChimney.setIndex( indChimney );
        geoChimney.computeVertexNormals();

        // Create meshes for each element
        this.walls = new THREE.Mesh(geoWalls, this.wallMaterials[2]);
        this.roof = new THREE.Mesh(geoRoof, this.roofMaterials[2]);
        this.door = new THREE.Mesh(geoDoor, this.windowDoorMaterials[2]);
        this.windows = new THREE.Mesh(geoWindows, this.windowDoorMaterials[2]);
        this.chimney = new THREE.Mesh(geoChimney, this.windowDoorMaterials[2]);

        // Add elements to the scene
        this.add(this.walls);
        this.add(this.roof);
        this.add(this.door);
        this.add(this.windows);
        this.add(this.chimney);
    }

    changeMaterials() {
        if (material0)
            this.changeMaterial(0);
        else if (material1)
            this.changeMaterial(1);
        else if (material2)
            this.changeMaterial(2);
        else if (material3)
            this.changeMaterial(3);
    }

    changeMaterial(material) {
        if (material == 0 && this.roof.material != this.wallMaterials[0]) {
            this.walls.material = this.wallMaterials[0];
            this.roof.material = this.roofMaterials[0];
            this.door.material = this.windowDoorMaterials[0];
            this.chimney.material = this.windowDoorMaterials[0];
            this.windows.material = this.windowDoorMaterials[0];
            return;
        } else if (material == 0 && this.walls.material == this.wallMaterials[0]) {
            this.walls.material = this.wallMaterials[4];
            this.roof.material = this.roofMaterials[4];
            this.door.material = this.windowDoorMaterials[4];
            this.chimney.material = this.windowDoorMaterials[4];
            this.windows.material = this.windowDoorMaterials[0];
            return;
        }
        this.wallMaterials[4] = this.wallMaterials[material];
        this.roofMaterials[4] = this.roofMaterials[material];
        this.windowDoorMaterials[4] = this.windowDoorMaterials[material];
        this.roof.material = this.roofMaterials[4];
        this.door.material = this.windowDoorMaterials[4];
        this.walls.material = this.wallMaterials[4];
        this.chimney.material = this.windowDoorMaterials[4];
        this.windows.material = this.windowDoorMaterials[4];
    }

    wireframes() {
        for (var i = 0; i < this.wallMaterials.length - 1; i++) {
            this.wallMaterials[i].wireframe = !this.wallMaterials[i].wireframe;
        }
        for (var i = 0; i < this.roofMaterials.length - 1; i++) {
            this.roofMaterials[i].wireframe = !this.roofMaterials[i].wireframe;
        }
        for (var i = 0; i < this.windowDoorMaterials.length - 1; i++) {
            this.windowDoorMaterials[i].wireframe = !this.windowDoorMaterials[i].wireframe;
        }
    }
}
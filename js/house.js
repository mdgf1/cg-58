
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


    equalVector(a,b){
        if( Math.abs( a[0] - b[0]) < 0.0001 && Math.abs(a[1] - b[1]) < 0.001 && Math.abs(a[2] - b[2] ) < 0.001)
            return true;
        return false;
    }
    sumVector(a,b){
        return [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
    }
    createGeometryRectangle(a,b,c,d, vertices, indices, normals){


        const size = []
        const magnitudex = Math.sqrt((b[0]-a[0])**2 + (b[1]-a[1])**2 + (b[2]-a[2])**2);
        const segmentx = [(b[0]-a[0])/Math.ceil(magnitudex) , (b[1]-a[1]) / Math.ceil(magnitudex) , (b[2]-a[2])/Math.ceil(magnitudex)];
        const magnitudey = Math.sqrt((c[0]-a[0])**2 + (c[1]-a[1])**2 + (c[2]-a[2])**2);
        const segmenty = [(c[0]-a[0])/Math.ceil(magnitudey), (c[1]-a[1]) / Math.ceil(magnitudey) , (c[2]-a[2])/Math.ceil(magnitudey)];
        // generate vertices, normals and color data for a simple grid geometry
        let startIndices = vertices.length/3;
        let segmentsx = 0;
        let segmentsy = 0;



        for ( let j = a; !this.equalVector(j,b); j= this.sumVector(j,segmentx) )
            segmentsx++;
        for ( let i = a; !this.equalVector(i,c); i = this.sumVector(i,segmenty))
            segmentsy++;

        for ( let i = a, indi =0; indi <= segmentsy; i = this.sumVector(i,segmenty), indi++) {
            for ( let j = a, indj = 0; indj <= segmentsx; j= this.sumVector(j,segmentx), indj++ ) {
                vertices.push(i[0] + j[0]-a[0] , i[1]+j[1]-a[1], i[2]+j[2]-a[2] );
                normals.push( 0, 0, 1 );
            }
        }
        // generate indices (data for element array buffer)
        for ( let i = a, indi = 0; indi < segmentsy; i = this.sumVector(i,segmenty), indi++) {
            for ( let j = a, indj = 0; indj < segmentsx; j = this.sumVector(j,segmentx),indj++ ) {
                const v1 = indi * (segmentsx+1) + (indj + 1);
                const v2 = indi * (segmentsx+1) + indj;
                const v3 = (indi + 1) * (segmentsx+1) + indj;
                const v4 = (indi + 1) * (segmentsx+1) + (indj + 1);
                indices.push(startIndices + v1,startIndices + v2,startIndices + v4); // face one
                indices.push(startIndices + v2,startIndices + v3,startIndices + v4); // face two
            }
        }

    }

    createCasa(){

        // Create materials
        var color = 0xF5F5DC;
        this.wallMaterials.push(new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
        this.wallMaterials.push(new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide}));
        this.wallMaterials.push(new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
        this.wallMaterials.push(new THREE.MeshToonMaterial({color: color, side: THREE.DoubleSide}));
        this.wallMaterials.push(this.wallMaterials[2]);

        color = 0x0000ff;
        this.windowDoorMaterials.push(new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
        this.windowDoorMaterials.push(new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide}));
        this.windowDoorMaterials.push(new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
        this.windowDoorMaterials.push(new THREE.MeshToonMaterial({color: color, side: THREE.DoubleSide}));
        this.windowDoorMaterials.push(this.windowDoorMaterials[2]);

        color = 0xffa500;
        this.roofMaterials.push(new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
        this.roofMaterials.push(new THREE.MeshLambertMaterial({color: color, side: THREE.DoubleSide}));
        this.roofMaterials.push(new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide}));
        this.roofMaterials.push(new THREE.MeshToonMaterial({color: color, side: THREE.DoubleSide}));
        this.roofMaterials.push(this.roofMaterials[2]);
    
        /***********************************************************
                                WALLS
            **********************************************************/
        const geoWalls = new THREE.BufferGeometry();
        const vertWalls = []
        const indWalls = []
        const normWalls = [];

        //front
        this.createGeometryRectangle([-10.0, 11.0, 5.0],
            [10.0, 11.0, 5.0],
            [-10.0, 10.0, 5.0],
            [10.0, 10.0, 5.0],
                vertWalls,
                indWalls,
                normWalls);
        this.createGeometryRectangle([-10.0, 10.0, 5.0],
            [-8.0, 10.0, 5.0],
            [-10.0, 7.0, 5.0],
            [-8.0, 7.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([-4.0, 10.0, 5.0],
            [0.0, 10.0, 5.0],
            [-4.0, 7.0, 5.0],
            [0.0, 7.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([7.0, 10.0, 5.0],
            [10.0, 10.0, 5.0],
            [7.0, 7.0, 5.0],
            [10.0, 7.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([-10.0, 7.0, 5.0],
            [10.0, 7.0, 5.0],
            [-10.0, 4.0, 5.0],
            [10.0, 4.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([-10.0, 4.0, 5.0],
            [-7.0, 4.0, 5.0],
            [-10.0, 0.0, 5.0],
            [-7.0, 0.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([-5.0, 4.0, 5.0],
            [10.0, 4.0, 5.0],
            [-5.0, 0.0, 5.0],
            [10.0, 0.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        //back
        this.createGeometryRectangle([10.0, 11.0, -5.0],
            [-10.0, 11.0, -5.0],
            [10.0, 0.0, -5.0],
            [-10.0, 0.0, -5.0],
            vertWalls,
            indWalls,
            normWalls);
        //left
        this.createGeometryRectangle([-10.0, 11.0, -5.0],
            [-10.0, 11.0, 5.0],
            [-10.0, 0.0, -5.0],
            [-10.0, 0.0, 5.0],
            vertWalls,
            indWalls,
            normWalls);
        //right
        this.createGeometryRectangle([10.0, 11.0, 5.0],
            [10.0, 11.0, -5.0],
            [10.0, 10.0, 5.0],
            [10.0, 10.0, -5.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([10.0, 10.0, 5.0],
            [10.0, 10.0, 4.0],
            [10.0, 8.0, 5.0],
            [10.0, 8.0, 4.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([10.0, 10.0, 0.0],
            [10.0, 10.0, -5.0],
            [10.0, 8.0, 0.0],
            [10.0, 8.0, 0.0],
            vertWalls,
            indWalls,
            normWalls);
        this.createGeometryRectangle([10.0, 8.0, 5.0],
            [10.0, 8.0, -5.0],
            [10.0, 0.0, 5.0],
            [10.0, 0.0, -5.0],
            vertWalls,
            indWalls,
            normWalls);

        geoWalls.setIndex( indWalls );
        geoWalls.setAttribute( 'position', new THREE.Float32BufferAttribute( vertWalls, 3 ) );
        geoWalls.setAttribute( 'normal', new THREE.Float32BufferAttribute( normWalls, 3 ) );
        /***********************************************************
                                ROOF
            **********************************************************/
        const geoRoof = new THREE.BufferGeometry();
    
        const vertRoof = [];
        const indRoof = [];
        const normRoof =[];


        this.createGeometryRectangle([-10.0, 16.0, 0.0],
            [10.0, 16.0, 0.0],
            [-10.0, 11.0, 5.0],
            [10.0, 11.0, 5.0],
            vertRoof,
            indRoof,
            normRoof);
        this.createGeometryRectangle([10.0, 16.0, 0.0],
            [-10.0, 16.0, 0.0],
            [10.0, 11.0, -5.0],
            [-10.0, 11.0, -5.0],
            vertRoof,
            indRoof,
            normRoof);

        geoRoof.setIndex( indRoof );
        geoRoof.setAttribute( 'position', new THREE.Float32BufferAttribute( vertRoof, 3 ) );
        geoRoof.setAttribute( 'normal', new THREE.Float32BufferAttribute( normRoof, 3 ) );
        /***********************************************************
                                Door
            **********************************************************/
        const geoDoor = new THREE.BufferGeometry();

        const vertDoor = [];
        const indDoor = [];
        const normDoor = [];
        this.createGeometryRectangle([-7.0, 4.0, 5.0],
            [-5.0, 4.0, 5.0],
            [-7.0, 0.0, 5.0],
            [-5.0, 0.0, 5.0],
            vertDoor,
            indDoor,
            normDoor);

        geoDoor.setIndex( indDoor );
        geoDoor.setAttribute( 'position', new THREE.Float32BufferAttribute( vertDoor, 3 ) );
        geoDoor.setAttribute( 'normal', new THREE.Float32BufferAttribute( normDoor, 3 ) );
        /***********************************************************
                            Windows
            **********************************************************/
        const geoWindows = new THREE.BufferGeometry();
    
        const vertWindows = [];
        const indWindows = [];
        const normWindows = [];
        this.createGeometryRectangle([-8.0, 10.0, 5.0],
            [-4.0, 10.0, 5.0],
            [-8.0, 7.0, 5.0],
            [-4.0, 7.0, 5.0],
            vertWindows,
            indWindows,
            normWindows);
        this.createGeometryRectangle([0.0, 10.0, 5.0],
            [7.0, 10.0, 5.0],
            [0.0, 7.0, 5.0],
            [7.0, 7.0, 5.0],
            vertWindows,
            indWindows,
            normWindows);
        this.createGeometryRectangle([10.0, 10.0, 4.0],
            [10.0, 10.0, 0.0],
            [10.0, 8.0, 4.0],
            [10.0, 8.0, 0.0],
            vertWindows,
            indWindows,
            normWindows);

        geoWindows.setIndex( indWindows );
        geoWindows.setAttribute( 'position', new THREE.Float32BufferAttribute( vertWindows, 3 ) );
        geoWindows.setAttribute( 'normal', new THREE.Float32BufferAttribute( normWindows, 3 ) );
        /***********************************************************
                            Chimney
            **********************************************************/
        const geoChimney = new THREE.BufferGeometry();

        const vertChimney = [];
        const indChimney= [];
        const normChimney = [];
        //front
        this.createGeometryRectangle([4.0, 17.0, 4.0],
            [6.0, 17.0, 4.0],
            [4.0, 11.0, 4.0],
            [6.0, 11.0, 4.0],
            vertChimney,
            indChimney,
            normChimney);
        //back
        this.createGeometryRectangle([6.0, 17.0, 2.0],
            [4.0, 17.0, 2.0],
            [6.0, 11.0, 2.0],
            [4.0, 11.0, 2.0],
            vertChimney,
            indChimney,
            normChimney);
        //left
        this.createGeometryRectangle([4.0, 17.0, 2.0],
            [4.0, 17.0, 4.0],
            [4.0, 11.0, 2.0],
            [4.0, 11.0, 4.0],
            vertChimney,
            indChimney,
            normChimney);
        //right
        this.createGeometryRectangle([6.0, 11.0, 2.0],
            [6.0, 11.0, 4.0],
            [6.0, 17.0, 2.0],
            [6.0, 17.0, 4.0],
            vertChimney,
            indChimney,
            normChimney);
        //top
        this.createGeometryRectangle([4.0, 17.0, 2.0],
            [6.0, 17.0, 2.0],
            [4.0, 17.0, 4.0],
            [6.0, 17.0, 4.0],
            vertChimney,
            indChimney,
            normChimney);


        geoChimney.setIndex( indChimney );
        geoChimney.setAttribute( 'position', new THREE.Float32BufferAttribute( vertChimney, 3 ) );
        geoChimney.setAttribute( 'normal', new THREE.Float32BufferAttribute( normChimney, 3 ) );
    
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
        if (material == 0 && this.walls.material != this.wallMaterials[0]) {
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
            this.windows.material = this.windowDoorMaterials[4];
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
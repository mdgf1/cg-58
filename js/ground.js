

class Ground extends THREE.Object3D {
    constructor() {
        super();
        this.createGround();
    }

    createGround() {
        'use strict';
        const geometry = new THREE.PlaneGeometry(800, 800);
        var loader  = new THREE.TextureLoader()
        var heightMap = new THREE.TextureLoader().load( 'heightmap.png' );
        var ground = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            displacementMap : heightMap,
            map: this.createFieldTexture(),
            displacementScale : 10,
            side: THREE.DoubleSide}));
        ground.rotation.x = -Math.PI/2;
        scene.add(ground);
    }

    createFieldTexture() {
        'use strict';
        const textureSize = 200;
        var canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        var context = canvas.getContext('2d');
      
        // Draw the background color
        context.fillStyle = '#96FF7C';
        context.fillRect(0, 0, textureSize, textureSize);
      
        // Draw the circles
        var colors = ['#ffffff', '#ffff00', '#c8a2c8', '#add8e6'];
        var circleRadius = 1;
        var numCircles = 600;
        var color;
        var x, y;
        for (var i = 0; i < numCircles; i++) {
          x = Math.random() * textureSize;
          y = Math.random() * textureSize;
          color = colors[i % colors.length];
          context.fillStyle = color;
          context.beginPath();
          context.arc(x, y, circleRadius, 0, 2 * Math.PI);
          context.fill();
        }
      
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
      
        return texture;
    }
}
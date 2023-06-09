

class Ground extends THREE.Object3D {
    constructor() {
        super();
        this.createGround();
    }

    createGround() {
        'use strict';
        var heightMap = new THREE.TextureLoader().load('https://web.tecnico.ulisboa.pt/~ist199290/heightmap.png');
        heightMap.wrapS = heightMap.wrapT = THREE.RepeatWrapping;
        const geometry = new THREE.PlaneGeometry(800, 800, 300, 300);
        const material = new THREE.MeshPhongMaterial({
            displacementMap : heightMap,
            map: this.createFieldTexture(),
            displacementScale : 50,});
        var ground = new THREE.Mesh(geometry, material);
        ground.rotation.x = Math.PI / 2;
        ground.rotation.y = Math.PI ;
        this.add(ground);
    }

    createFieldTexture() {
        'use strict';
        const textureSize = 200;
        var canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        var context = canvas.getContext('2d');
      
        // Draw the background color
        context.fillStyle = '#037d50';
        context.fillRect(0, 0, textureSize, textureSize);
      
        // Draw the flowers
        var colors = ['#ff1493', '#8014ff', '#FFFF33', '#add8e6'];
        for (var i = 0; i < 600; i++) {
          var x = Math.random() * textureSize;
          var y = Math.random() * textureSize;
          var color = colors[i % colors.length];
          context.fillStyle = color;
          context.beginPath();
          context.arc(x, y, 1, 0, 3 * Math.PI);
          context.fill();
        }
      
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
      
        return texture;
    }
}
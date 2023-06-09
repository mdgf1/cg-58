// CONSTS
const skyDomeXYZ = 400;


class SkyDome extends THREE.Object3D {
    materials = [];

    constructor() {
        super();
        this.createSkyDome();
    }

    createSkyDome() {
        'use strict';
        
        const geometry = new THREE.SphereGeometry(skyDomeXYZ, 32, 16, 0, Math.PI); 
        var skyDome = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map: this.createSkyTexture(), side: THREE.BackSide}));
        skyDome.rotation.x = -Math.PI/2;
        this.add(skyDome);
    }

    createSkyTexture() {
        'use strict';
        const textureSize = 200;
        var canvas = document.createElement('canvas');
        canvas.width = textureSize;
        canvas.height = textureSize;
        var context = canvas.getContext('2d');
      
        // Create the gradient background
        var gradient = context.createLinearGradient(0, 0, 0, textureSize);
        gradient.addColorStop(0, '#8014ff'); // Dark blue
        gradient.addColorStop(1, '#0c0674'); // Dark violet
        context.fillStyle = gradient;
        context.fillRect(0, 0, textureSize, textureSize);
      
        // Draw the stars
        var starRadius = 0.8;
        var numStars = 900;
        for (var i = 0; i < numStars; i++) {
          var x = Math.random() * textureSize;
          var y = Math.random() * textureSize;
          context.fillStyle = '#ffffff';
          context.beginPath();
          context.arc(x, y, starRadius, 0, 5 * Math.PI);
          context.fill();
        }
      
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
      
        return texture;
    }
}
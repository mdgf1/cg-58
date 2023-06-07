// Create a sphere geometry
var radius = 10; // Adjust the radius as needed
var widthSegments = 32; // Adjust the number of segments as needed
var heightSegments = 16; // Adjust the number of segments as needed
var geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

// Create a custom shader material
var vertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

var fragmentShader = `
    varying vec3 vNormal;
    void main() {
        vec3 lightColor = vec3(1.0, 1.0, 1.0);
        vec3 darkColor = vec3(0.0, 0.0, 0.3);
        
        // Calculate the dot product between the normal and the up direction
        float dotProduct = dot(vNormal, vec3(0.0, 1.0, 0.0));
        
        // Interpolate between the light and dark color based on the dot product
        vec3 color = mix(darkColor, lightColor, dotProduct);
        
        gl_FragColor = vec4(color, 1.0);
    }
`;

var material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

// Create the dome mesh using the geometry and material
var domeMesh = new THREE.Mesh(geometry, material);

// Add the dome mesh to the scene
scene.add(domeMesh);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the dome
    domeMesh.rotation.y += 0.005;

    renderer.render(scene, camera);
}
animate();
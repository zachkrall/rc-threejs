import * as THREE from 'three';
import { Shader } from './shader.js';

import './style.css';

// Create a Three.js Scene
var scene = new THREE.Scene();

// Set Up Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// Move camera
camera.position.z = 42;

// Set up renderer and add to document body
var renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// load texture
// var texture = new THREE.TextureLoader().load( "textures/gradient.png" );
// create material using texture

// shaders
var shader = Shader;
var uniforms = THREE.UniformsUtils.clone( shader.uniforms );
uniforms[ "u_time" ].value = 0;
uniforms[ "u_resolution" ].value = [
	window.innerWidth,
	window.innerHeight
];

var material = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: shader.vertexShader,
	fragmentShader: shader.fragmentShader,
	wireframe: true
} );

// var material = new THREE.MeshBasicMaterial( { map: texture } );
// var material = new THREE.MeshNormalMaterial({wireframe: true});
// create geometry for 3D shape
var geometry = new THREE.SphereBufferGeometry( 20,100,100 );
// create a torus object using our geometry and material
var sphere = new THREE.Mesh( geometry, material );

// add torus to scene
scene.add( sphere );


function animate() { // this loops
	requestAnimationFrame( animate ); // this updates our animation frame
	renderer.render( scene, camera ); // this renders our new frame
	sphere.rotation.y += 0.01; // this increases our rotation value for torus
	
	uniforms[ "u_time" ].value += 0.1;
}
animate();

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
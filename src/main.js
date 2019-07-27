import * as THREE from 'three';
import OrbitControls from './controls/OrbitControls.js';
import { Shader as myshader } from './shader.js';

import Shape from './shape.js';

import './style.css';

global.width = window.innerWidth;
global.height = window.innerHeight;

let mouse = {x: 0, y: 0};

global.resetBuffer = false;

global.Shape = Shape;

global.shader = myshader;
const shaderConfig = {
	uniforms: shader.uniforms,
	vertexShader: shader.vertexShader,
	fragmentShader: shader.fragmentShader,
	wireframe: shader.wireframe || false,
	defines: shader.defines
};
shader.uniforms["u_time"].value = 0.0;
shader.uniforms[ "u_resolution" ].value = [
	window.innerWidth,
	window.innerHeight
];

global.scene    = new THREE.Scene();
global.camera   = new THREE.PerspectiveCamera(
					75, width / height, 0.1, 1000
				  );
global.renderer = new THREE.WebGLRenderer({
					alpha: false,
					autoClear: resetBuffer,
					preserveDrawingBuffer: true
				  });

renderer.autoClear = resetBuffer;
renderer.setSize(width, height);
renderer.clear(resetBuffer);
document.body.appendChild(renderer.domElement);
global.camerareset = () => {
	camera.position.set(0,0,55);
}
camerareset();
global.controls = new OrbitControls(camera, renderer.domElement);
controls.update();


global.shaderMaterial = new THREE.ShaderMaterial(shaderConfig);
global.basicMaterial  = new THREE.MeshBasicMaterial({color: 0xffffff});

global.sphere    = new THREE.SphereBufferGeometry( 30,50,50 );
global.torusKnot = new THREE.TorusKnotBufferGeometry(10, 3, 100, 16);

global.shape1 = new THREE.Mesh( sphere, shaderMaterial );
global.shape2 = new THREE.Mesh( torusKnot, basicMaterial );

global.genSphere = (mat=basicMaterial,x=30,y=60,z=60) => {
	let geo = new THREE.SphereBufferGeometry( 30,60,60 );
	return new THREE.Mesh(geo, mat);
}

// global.shape1 = genSphere(shaderMaterial);

scene.add(shape1);

function animate() { // this loops

	requestAnimationFrame( animate ); // this updates our animation frame
	controls.update();
	renderer.clear(resetBuffer);
	renderer.render( scene, camera ); // this renders our new frame

	// Object.assign(shape1.rotation,{
	// 	x: shape1.rotation.x + 0.01,
	// 	z: shape1.rotation.z + 0.01
	// });
	
	shader.uniforms[ "u_time" ].value += 0.1;
	shader.uniforms["amp"].value =  (mouse.y / height) * 10.0;
	console.log('amp: ', shader.uniforms["amp"].value);

}
animate();

function onWindowResize() {

	global.width = window.innerWidth;
	global.height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);

}
window.addEventListener('resize', onWindowResize, false);

document.addEventListener('mousemove', function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

global.clear = () => renderer.clear();
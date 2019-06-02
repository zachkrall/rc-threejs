// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer, stats;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth /window.innerHeight, 1, 2000 );
	camera.position.y = 400;

	scene = new THREE.Scene();

	var light, object;

	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( pointLight );
	scene.add( camera );

	var material = new THREE.MeshNormalMaterial( );

	//

	object = new THREE.Mesh( new THREE.SphereBufferGeometry( 75, 20, 10 ), material );
	object.position.set( 0, 0, -10 );
	scene.add( object );

//     // GROUND
// 	var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
// 	var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
// 	groundMat.color.setHSL( 0, 0,0.5 );

// 	var ground = new THREE.Mesh( groundGeo, groundMat );
// 	ground.rotation.x = -Math.PI/2;
// 	ground.position.y = -10;
// 	scene.add( ground );

// 	ground.receiveShadow = true;

	//

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// set up controls
    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.enableZoom = true;
    // controls.minDistance = 400;
    // controls.maxDistance = 900;

// 	stats = new Stats();
// 	document.body.appendChild( stats.dom );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
// 	stats.update();

}

function render() {

	var timer = Date.now() * 0.0001;

// 	camera.position.x = Math.cos( timer ) * 800;
// 	camera.position.z = Math.sin( timer ) * 800;

// 	camera.lookAt( scene.position );

// 	scene.traverse( function( object ) {

// 		if ( object.isMesh === true ) {

// 			object.rotation.x = timer * 5;
// 			object.rotation.y = timer * 2.5;

// 		}

// 	} );

	renderer.render( scene, camera );

}

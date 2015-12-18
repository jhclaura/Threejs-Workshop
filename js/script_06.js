/*
 * Made by @jhclaura (Laura Chen, jhclaura.com)
 * for Three.js Pop-Up Workshops
 * X'mas season 2015
 *
 * @Topic: Animation Scripting, using Tween.js
 */

////////////////////////////////////////////////////////////	
// SET_UP_VARIABLES
////////////////////////////////////////////////////////////

// standard global variables
var scene, camera, renderer;
var light;

var container;
var controls;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// custom global variables
var treeGeo, treeTexture, treeMat, tree;

var trees = [];

var cubes = [];
var cubeColors = [ 0x6bd452, 0x52d4bb, 0xbb52d4, 0xd4526b];
var cubePositions = [ new THREE.Vector3(-25,0,-25),
					  new THREE.Vector3(-25,0,25),
					  new THREE.Vector3(25,0,-25),
					  new THREE.Vector3(25,0,25) ];
var cubeIsUps = [];

var cameraPath = [ new THREE.Vector3(0,0,100),
				   new THREE.Vector3(-200,300,-200),
				   new THREE.Vector3(300,800,500),
				   new THREE.Vector3(800,200,-300) ];
var cameraPathX = [0,-200,300,100,0];
var cameraPathY = [0,300,800,400,0];
var cameraPathZ = [100,-200,500,-300,100];


// kind of like setup()
init();


///////////////////////////////////////////////////////////
// FUNCTIONS 
///////////////////////////////////////////////////////////
			
function init() 
{
	// SCENE
	// construct environment first
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x99e2bf, 0.002 );	// dosen't work on mobile

	// LIGHT
	// create light for the scene
	light = new THREE.HemisphereLight( 0xe299b0, 0x3dc886, 1 );		// sky + ground; will affect model
	scene.add(light);

	// RENDERER
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( scene.fog.color );	//set background color as fog's color
	container.appendChild(renderer.domElement);

	// VR_STEREO_EFFECT
	effect = new THREE.StereoEffect( renderer );
	effect.eyeSeparation = 10;
	effect.setSize( window.innerWidth, window.innerHeight );

	// CAMERA
	// PerspectiveCamera( field of view, aspect, near, far )
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 100;						//set the position of the camera
	scene.add(camera);								//add camera into the scene

	// CONTROLS
	// controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls = new THREE.DeviceOrientationControls( camera );

	// TWEEN_CAMERA
	var cameraTween = new TWEEN.Tween( camera.position )
					  .to( { x: cameraPathX, y: cameraPathY, z: cameraPathZ }, 10000 )
					  .interpolation( TWEEN.Interpolation.CatmullRom )
					  .easing( TWEEN.Easing.Linear.None )
					  .repeat( Infinity )
					  .delay( 2000 )
					  .start();

	// Mesh
	// - Floor as reference
		geo = new THREE.PlaneGeometry(1500,1500);
		mat = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh(geo, mat);
		plane.position.y = -100;
		plane.rotation.x = -Math.PI/2;
		scene.add(plane);

	// - Cube * 4
		geo = new THREE.BoxGeometry(30,30,30);
		for(var i=0; i<4; i++){
			mat = new THREE.MeshLambertMaterial( {color: cubeColors[i]} );
			var cube = new THREE.Mesh(geo, mat);
			cube.position.copy( cubePositions[i] );
			scene.add(cube);
			cubes.push(cube);
			cubeIsUps.push(false);
		}

	// Loading External Texture & Model
	var manager = new THREE.LoadingManager();		//Handles and keeps track of loaded and pending data

	// TEXTURE
		treeTexture = new THREE.Texture();
		var loader = new THREE.ImageLoader( manager );
		loader.load( 'images/treeColor.png', function ( image ) {
			treeTexture.image = image;
			treeTexture.needsUpdate = true;
		} );

	// MODLE (MESH)
	// - Import using OBJLoader.js
	// - reference:
	// (DOC) http://threejs.org/docs/#Reference/Loaders/OBJLoader
	// (Example) http://threejs.org/examples/webgl_loader_obj.html
		var loader = new THREE.OBJLoader( manager );
		loader.load( 'models/lowpolytree_afterWorkshop.obj', function (object) {

			// for all the children in the OBJ model (cuz you can export multiple models as one OBJ)
			for(var i=0; i<object.children.length; i++){
				if ( object.children[i] instanceof THREE.Mesh ) {
					treeGeo = object.children[i].geometry;
				}
			}
		}, onProgress, onError );

		// Display the uploading progress as percentage
		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		// Callback function when the loading fails
		var onError = function ( xhr ) {
		};

	treeMat = new THREE.MeshLambertMaterial({map: treeTexture, side: THREE.DoubleSide});

	// EVENTS
	// addEventListener(event, function, useCapture);
	// useCapture: the outer most element's event is handled first and then the inner; default is false
	// More: http://www.w3schools.com/js/js_htmldom_eventlistener.asp
		window.addEventListener( 'resize', onWindowResize, false );		// automatically resize renderer
		window.addEventListener( 'click', fullscreen, false);
		document.addEventListener( 'click', onMouseClick, false );
		document.addEventListener( 'keydown', onKeyDown, false );

	// kind of like draw()/loop()
	animate();
}

function onMouseClick() {
	for(var i=0; i<10; i++){
		tree = new THREE.Mesh( treeGeo, treeMat );
		tree.position.x = ( Math.random() - 0.5 ) * 1000;
		tree.position.y = ( Math.random() - 0.5 ) * 1000;
		tree.position.z = ( Math.random() - 0.5 ) * 1000;
		tree.scale.set(7,7,7);

		//TWEEN
		var treeTween = new TWEEN.Tween( tree.position )
						.to( { y: tree.position.y+300 }, 750 )
						.repeat( Infinity )
						.delay( 1000 )
						.yoyo( true )
						.easing( TWEEN.Easing.Cubic.InOut )
						.start();
		var treeTweenRot = new TWEEN.Tween( tree.rotation )
						.to( { x: Math.PI*2 }, 750 )
						.repeat( Infinity )
						.delay( 1000 )
						.yoyo( true )
						.easing( TWEEN.Easing.Cubic.InOut )
						.start();

		scene.add( tree );
		trees.push( tree );
	}
}

function onKeyDown( event ) {
	// ASCII find: http://isithackday.com/whatkeycode/
	switch (event.keyCode) {
		case 49: // 1
			if(!cubeIsUps[0])
				new TWEEN.Tween(cubes[0].position).to({y: 20}, 500).easing( TWEEN.Easing.Back.InOut).start();
			else
				new TWEEN.Tween(cubes[0].position).to({y: 0}, 500).easing( TWEEN.Easing.Back.InOut).start();

			cubeIsUps[0] = !cubeIsUps[0];
			break;
		case 50: // 2
			if(!cubeIsUps[1])
				new TWEEN.Tween(cubes[1].position).to({y: 20}, 1500).easing( TWEEN.Easing.Elastic.InOut).start();
			else
				new TWEEN.Tween(cubes[1].position).to({y: 0}, 1500).easing( TWEEN.Easing.Elastic.InOut).start();
			
			cubeIsUps[1] = !cubeIsUps[1];
			break;
		case 51: // 3
			if(!cubeIsUps[2])
				new TWEEN.Tween(cubes[2].position).to({y: 20}, 1500).easing( TWEEN.Easing.Elastic.InOut).start();
			else
				new TWEEN.Tween(cubes[2].position).to({y: 0}, 1500).easing( TWEEN.Easing.Elastic.InOut).start();
			
			cubeIsUps[2] = !cubeIsUps[2];
			break;
		case 52: // 4
			if(!cubeIsUps[3])
				new TWEEN.Tween(cubes[3].position).to({y: 20}, 1500).easing( TWEEN.Easing.Elastic.InOut).start();
			else
				new TWEEN.Tween(cubes[3].position).to({y: 0}, 1500).easing( TWEEN.Easing.Elastic.InOut).start();
			
			cubeIsUps[3] = !cubeIsUps[3];
			break;
	}
}


function animate() {
    requestAnimationFrame( animate );				//http://creativejs.com/resources/requestanimationframe/
	update();
	render();		
}

function update() {

	// update controls of camera
	controls.update();

	// update Tween.js library
	TWEEN.update();

	// if any trees exist, rotate it
	for(var i=0; i<trees.length; i++){
		trees[i].rotation.y += 0.1;
	}
}

function render() {	
	// renderer.rend er( scene, camera );
	effect.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	// renderer.setSize( window.innerWidth, window.innerHeight );
	effect.setSize( window.innerWidth, window.innerHeight );
}

function fullscreen() {
	if (container.requestFullscreen) {
		container.requestFullscreen();
	} else if (container.msRequestFullscreen) {
		container.msRequestFullscreen();
	} else if (container.mozRequestFullScreen) {
		container.mozRequestFullScreen();
	} else if (container.webkitRequestFullscreen) {
		container.webkitRequestFullscreen();
	}
}

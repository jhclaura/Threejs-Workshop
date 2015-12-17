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
	////////////////////////////////////////////////////////////
	// ----------------- GENERAL_SETUP ---------------------- //
	////////////////////////////////////////////////////////////

	// SCENE
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x99e2bf, 0.002 );

	// LIGHT
	light = new THREE.HemisphereLight( 0xe299b0, 0x3dc886, 1 );		// sky + ground; will affect model
	scene.add(light);

	// RENDERER
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( scene.fog.color );	//set background color as fog's color
	container.appendChild(renderer.domElement);

	// CAMERA
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 100;						//set the position of the camera
	scene.add(camera);								//add camera into the scene

	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );

	// TWEEN_CAMERA
	// ...
	// ...
	// ...

	////////////////////////////////////////////////////////////
	// ---------------- Object_Primitives ------------------- //
	////////////////////////////////////////////////////////////

	// Floor as reference
		geo = new THREE.PlaneGeometry(1500,1500);
		mat = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh(geo, mat);
		plane.position.y = -100;
		plane.rotation.x = -Math.PI/2;
		scene.add(plane);

	// Cube * 4
		geo = new THREE.BoxGeometry(30,30,30);
		for(var i=0; i<4; i++){
			mat = new THREE.MeshLambertMaterial( {color: cubeColors[i]} );
			var cube = new THREE.Mesh(geo, mat);
			cube.position.copy( cubePositions[i] );
			scene.add(cube);
			// cubes.push(cube);
			// cubeIsUps.push(false);
		}

	////////////////////////////////////////////////////////////
	// ------------------ Object_Imported ------------------- //
	////////////////////////////////////////////////////////////

	// Loading External Texture & Model
	var manager = new THREE.LoadingManager();		//Handles and keeps track of loaded and pending data

	// TEXTURE
		treeTexture = new THREE.Texture();
		var loader = new THREE.ImageLoader( manager );
		loader.load( 'images/treeColor.png', function ( image ) {
			treeTexture.image = image;
			treeTexture.needsUpdate = true;
		} );

	// MATERIAL
		treeMat = new THREE.MeshLambertMaterial({map: treeTexture, side: THREE.DoubleSide});

	// Import Mesh using OBJLoader.js
	// - reference:
	// - (DOC) http://threejs.org/docs/#Reference/Loaders/OBJLoader
	// - (Example) http://threejs.org/examples/webgl_loader_obj.html
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


	// EVENTS
	// addEventListener(event, function, useCapture);
	// useCapture: the outer most element's event is handled first and then the inner; default is false
	// More: http://www.w3schools.com/js/js_htmldom_eventlistener.asp
		window.addEventListener( 'resize', onWindowResize, false );		// automatically resize renderer
		
		// click
		// ...
		// ...

		// keydown
		// ...
		// ...




	// kind of like draw()/loop()
	animate();
}


function animate() {
    requestAnimationFrame( animate );				//http://creativejs.com/resources/requestanimationframe/
	update();
	render();		
}

function update() {

	// update controls of camera
	controls.update();

	// if any trees exist, rotate it
	for(var i=0; i<trees.length; i++){
		trees[i].rotation.y += 0.1;
	}
}

function render() {	
	renderer.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

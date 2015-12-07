/*
 * Made by @jhclaura (Laura Chen, jhclaura.com)
 * for Three.js Pop-Up Workshops
 * X'mas season 2015
 */

////////////////////////////////////////////////////////////	
// SET_UP_VARIABLES
////////////////////////////////////////////////////////////

// standard global variables
var scene, cameraThree, renderer;
var light;


var container;
var controls;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// custom global variables
var model, texture;


// kind of like setup()
init();
// kind of like draw()/loop()
animate();





///////////////////////////////////////////////////////////
// FUNCTIONS 
///////////////////////////////////////////////////////////
			
function init() 
{
	// SCENE
	// construct environment first
	scene = new THREE.Scene();


	// LIGHT
	// create light for the scene
	light = new THREE.DirectionalLight( 0xffffff, 1);
	light.position.set(1,1,1);
	scene.add(light);
	light = new THREE.DirectionalLight( 0xffffff, 1);
	light.position.set(-1,1,-1);
	scene.add(light);


	// CAMERA
	// PerspectiveCamera( field of view, aspect, near, far )
	cameraThree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	cameraThree.position.z = 100;						//set the position of the camera
	// cameraThree.position.set(0,150,400);				//can also do position.set(x, y, z)
	scene.add(cameraThree);								//add camera into the scene

	// Mesh
	geo = new THREE.PlaneGeometry(100,100);
	mat = new THREE.MeshLambertMaterial( {color: 0xed5d9c, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh(geo, mat);
	plane.position.y = -10;
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);

	// Loading External Texture & Model
	var manager = new THREE.LoadingManager();
	// TEXTURE
	texture = new THREE.Texture();
	var loader = new THREE.ImageLoader( manager );
	loader.load( 'images/bed.png', function ( image ) {
		texture.image = image;
		texture.needsUpdate = true;
	} );

	// MODLE (MESH)
	// - Import using OBJLoader.js
	// - reference: http://threejs.org/examples/webgl_loader_obj.html
	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) {
	};
	var loader = new THREE.OBJLoader( manager );
	loader.load( 'models/bed.obj', function (object) {

		object.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material.map = texture;
			}
		} );

		model = object;
		model.scale.set(7,7,7);
		scene.add( model );

	}, onProgress, onError );


	

	// RENDERER
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	renderer.setClearColor(0xfdf3a0, 1);			//set background color
	// renderer.setClearColor(0xffffff, 1);

	container.appendChild(renderer.domElement);

	
	// EVENTS
	// automatically resize renderer
	window.addEventListener( 'resize', onWindowResize, false );

	
	// CONTROLS
	// left click to rotate, middle click/scroll to zoom, right click to pan
	controls = new THREE.OrbitControls( cameraThree, renderer.domElement );
		
}


function animate() 
{
    requestAnimationFrame( animate );				//http://creativejs.com/resources/requestanimationframe/
	update();
	render();		
}

function update()
{		
	controls.update();
}

function render() 
{	
	renderer.render( scene, cameraThree );
}

function onWindowResize() {
	cameraThree.aspect = window.innerWidth / window.innerHeight;
	cameraThree.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

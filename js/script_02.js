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


var container;
var controls;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// custom global variables
var cube;


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


	// CAMERA
	// PerspectiveCamera( field of view, aspect, near, far )
	cameraThree = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight/3), 1, 10000);
	cameraThree.position.z = 100;						//set the position of the camera
	// cameraThree.position.set(0,150,400);				//can also do position.set(x, y, z)
	scene.add(cameraThree);								//add camera into the scene


	// CUBE (MESH)
	// needs geometry + material
	// CUBE (MESH)
	// needs geometry + material
	var geo = new THREE.BoxGeometry(5,5,5);
	var mat = new THREE.MeshLambertMaterial( {color: 0xff0000} );
	cube = new THREE.Mesh( geo, mat );
	scene.add(cube);

	geo = new THREE.SphereGeometry(5, 32, 32);
	var sphere = new THREE.Mesh(geo, mat);
	sphere.position.set(10,0,0);
	scene.add(sphere);

	geo = new THREE.PlaneGeometry(100,100);
	mat = new THREE.MeshLambertMaterial( {color: 0xffffff} );
	var plane = new THREE.Mesh(geo, mat);
	plane.position.y = -10;
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);

	

	// RENDERER
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( window.innerWidth, window.innerHeight/3 );
	
	renderer.setClearColor(0xeff5d5, 1);			//set background color
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
	cameraThree.aspect = window.innerWidth / (window.innerHeight/3);
	cameraThree.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, (window.innerHeight/3) );
}

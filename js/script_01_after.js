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
	light = new THREE.DirectionalLight( 0xffffff, 1);
	light.position.set(-1,1,-1);
	scene.add(light);


	// CAMERA
	// PerspectiveCamera( field of view, aspect, near, far )
	cameraThree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	cameraThree.position.z = 100;						//set the position of the camera
	// cameraThree.position.set(0,150,400);				//can also do position.set(x, y, z)
	scene.add(cameraThree);								//add camera into the scene


	// CUBE (MESH)
	// needs geometry + material
	var geo = new THREE.BoxGeometry(5,5,5);
	var mat = new THREE.MeshLambertMaterial( {color: 0xffff00} );
	cube = new THREE.Mesh( geo, mat );
	cube.position.x = -10;
	scene.add(cube);

	for(var i=0; i<50; i+=10 ){
		for(var j=0; j<50; j+=10) {
			mat = new THREE.MeshLambertMaterial( {color: Math.random() * 0xffffff} );	// random colors!
			var mesh = new THREE.Mesh( geo, mat );
			mesh.position.set(i,j,j)
			scene.add(mesh);
		}
	}

	geo = new THREE.SphereGeometry(5, 32, 32);
	mat = new THREE.MeshLambertMaterial( {color: 0xffffff} );
	var sphere = new THREE.Mesh(geo, mat);
	sphere.position.set(10,0,0);
	scene.add(sphere);

	geo = new THREE.PlaneGeometry(100,100);
	mat = new THREE.MeshLambertMaterial( {color: 0xed5d9c} );
	var plane = new THREE.Mesh(geo, mat);
	plane.position.y = -10;
	plane.rotation.x = -Math.PI/2;
	scene.add(plane);
	

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

	cube.rotation.y += 0.1;
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

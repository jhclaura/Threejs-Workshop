/*
 * Made by @jhclaura (Laura Chen, jhclaura.com)
 * for Three.js Pop-Up Workshops
 * X'mas season 2015
 *
 * @Topic: Video
 * @Reference hugely from: http://jeromeetienne.github.io/threex.videotexture/examples/videotexture.html
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
var imgScreen, screens;

var videoo, videoImage, videoImageContext, videoTexture;
var videoIsPlaying = false;

var thisIsTouchDevice = false;
if( isTouchDevice() ) thisIsTouchDevice = true;


///////////////////////////////////////////////////////////

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

	// IMAGE_TEXTURE
	var geo = new THREE.PlaneGeometry(10,10);
	var texture = THREE.ImageUtils.loadTexture("images/1.png");
	var mat = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
	imgScreen = new THREE.Mesh( geo, mat );
	imgScreen.position.x = -10;
	scene.add(imgScreen);

	// VIDEO_TEXTURE
	videoo = document.createElement('video');
	videoo.setAttribute("webkit-playsinline", "");
	videoo.setAttribute("playsinline", "");
	// videoo.autoplay = true;
	videoo.loop = true;
	// videoo.preload = "auto";
	videoo.src = "videos/sintel.mp4";

	//
	videoo.addEventListener("contextmenu", function (e) { e.preventDefault(); e.stopPropagation(); }, false);
	// hide the controls if they're visible
    if (videoo.hasAttribute("controls")) {
        videoo.removeAttribute("controls")   
    }

	videoImage = document.createElement('canvas');
	videoImage.width = 480;
	videoImage.height = 204;

	videoImageContext = videoImage.getContext('2d');
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect(0,0, videoImage.width, videoImage.height);

	// videoTexture = new THREE.Texture( videoo );
	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.NearestFilter;
	videoTexture.magFilter = THREE.LinearFilter;

	geo = new THREE.PlaneGeometry(16,9);
	mat = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide} );

	for(var i=0; i<100; i+=20 ){
		for(var j=0; j<100; j+=20) {
			var mesh = new THREE.Mesh( geo, mat );
			mesh.position.set(i,j,j)
			scene.add(mesh);
		}
	}

	// RENDERER
	container = document.createElement('div');
	document.body.appendChild(container);
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setPixelRatio(window.devicePixelRatio);
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

	var onTouchStart = function ( event ) {
		// if(!videoIsPlaying){
			videoo.play();
			// videoIsPlaying = true;
			console.log("play video!");
		// }		
	}

	if(thisIsTouchDevice)
		document.body.addEventListener( 'touchstart', onTouchStart, false );
		
}

function onVideoPlayButtonClick(){
	videoo.play();
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

	imgScreen.rotation.y += 0.1;

}

function render()
{	
	if( videoo.readyState === videoo.HAVE_ENOUGH_DATA ) {
		videoImageContext.drawImage(videoo, 0, 0);
		if(videoTexture)
			videoTexture.needsUpdate = true;
	}

	renderer.render( scene, cameraThree );
}

function onWindowResize() {
	cameraThree.aspect = window.innerWidth / window.innerHeight;
	cameraThree.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function isTouchDevice() {
	return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
}
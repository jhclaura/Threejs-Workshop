# Three.js Pop-Up Workshop

ITP Residents Workshops - 2015

## Notes
<a href="https://docs.google.com/document/d/1RwYWV94LJ3hPDWqfGGE7xWkjkXSig4r1AnkLl5wyo_s/edit?usp=sharing" target="_blank">Of the workshops</a>

## Topic
* Pop-up on 11/30/15
	* <a href="http://jhclaura.github.io/Threejs-Workshop/1_intro.html" target="_blank">Intro: Up & Run</a> Give you ready-to-roll template.
	* <a href="http://jhclaura.github.io/Threejs-Workshop/2_wP5.html" target="_blank">Incorporate with P5js</a> Just put two canvas, one Three.js, one P5.js, together!
* Pop-up on 12/14/15
	* <a href="https://docs.google.com/document/d/1RwYWV94LJ3hPDWqfGGE7xWkjkXSig4r1AnkLl5wyo_s/edit#heading=h.1hvl1sgy3gjy" target="_blank">What's UV Mapping?</a> A way to flatten the 3D model so we can draw texture in 2D format, plus some interesting examples
	* <a href="http://jhclaura.github.io/Threejs-Workshop/3_model.html" target="_blank">Import 3D model</a> In the workshop, we used Maya to create UVs of a downloaded Christmas tree, and used Photoshop to draw the texture
	* <a href="http://jhclaura.github.io/Threejs-Workshop/4_video.html" target="_blank">Texture & Video</a> For playing video, it's easy to do in laptop Chrome and Android Chrome, but not iOS iPhone. Playing video on iPhone will be forced to enter fullscreen mode. So the turn-around here is to push the video frame by frame, instead of play the video ( eg. video.play() )
* Pop-up on 12/17/15
	* <a href="http://jhclaura.github.io/Threejs-Workshop/5_animation.html" target="_blank">Animation Scripting</a>, using <a href="https://docs.google.com/document/d/1RwYWV94LJ3hPDWqfGGE7xWkjkXSig4r1AnkLl5wyo_s/edit#heading=h.j6kpftyoy6uh" target="_blank">Tween.js</a>, also addEventListener for mouse and keyboard (click to generate trees; keydown 1,2,3,4 to toggle to cubes)
	* <a href="http://jhclaura.github.io/Threejs-Workshop/6_vr.html" target="_blank">VR</a>, change just few lines of codes and use DeviceOrientationControl. Voila! Some thoughts: although it's easy to convert normal render to stereo render, the whole interaction is different and needs to redesign for vr users :)

## Using local server
[let's use localhost to serve the page!]

0. git clone OR download as ZIP
1. open Terminal
2. go into directory:
  1. cd 
  2. drag folder/directory into Terminal
  3. enter
3. python -m SimpleHTTPServer 8000
4. Open browser and type localhost:8000

## Android Phone Debug
Debugging on Android with Chrome <a href="https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging" target="_blank">tutorial</a>

## Resources / Links
* Three.js: <a href="http://threejs.org/docs/" target="_blank">doc</a>, <a href="http://threejs.org/examples/" target="_blank">example</a>
* <a href="https://www.udacity.com/course/interactive-3d-graphics--cs291" target="_blank">Udacity: Interactive 3D Graphics</a>
* <a href="http://stemkoski.github.io/Three.js/" target="_blank">Stemkoski's github</a>
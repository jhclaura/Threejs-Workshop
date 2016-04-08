/*
 * P5js Example:
 * @name Multiple Objects
 * @description Create a Jitter class, instantiate multiple objects,
 * and move it around the screen. 
 */
var bug1;  // Declare objects
var bug2;
var bug3;
var bug4;

var p5cs;

function setup() {
  p5cs = createCanvas(512, 512);
  p5cs.position(0,300);

  // Create object
  bug1 = new Jitter();
  bug2 = new Jitter();
  bug3 = new Jitter();
  bug4 = new Jitter();

  // init Three.js
  init();
}

function draw() {
  // moved into animate function inside three.js script
  // so the order will be correct
  // p5 canvas update -> three.js texture update -> three.js render
  /*
  background(50, 89, 100);
  bug1.move();
  bug1.display();
  bug2.move();
  bug2.display();
  bug3.move();
  bug3.display();
  bug4.move();
  bug4.display();
  */
}

// Jitter class
function Jitter() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.speed = 5;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}
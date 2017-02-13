import React from 'react';
import {canvas} from '../../App.css';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resized: false
    };
  }

  componentDidMount() {
    this.handleDrawCanvas();
    window.onresize = () => {
      this.remountComponent();
    };
  }

  componentWillUnmount() {

  }

  remountComponent = () => {
    this.setState({ resized: true });
  }

  timeout(callback) {
    window.setTimeout(callback, 1000 / 5);
  }
  clearTimeout(id) {
    window.clearTimeout(id);
  }

  handleDrawCanvas = () => {
    // RequestAnimFrame: a browser API for getting smooth animations

    window.requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      this.timeout;

       window.cancelAnimationFrame = window.cancelAnimationFrame ||
         window.webkitCancelAnimationFrame ||
         window.mozCancelAnimationFrame ||
         window.oCancelAnimationFrame ||
         window.msCancelAnimationFrame ||
         this.clearTimeout;

    // Initializing the canvas
    // I am using native JS here, but you can use jQuery,
    // Mootools or anything you want
    const canvas = document.getElementById('matrix');

    // Initialize the context of the canvas
    const ctx = canvas.getContext('2d');

    // Set the canvas width and height to occupy full window
    let W = window.innerWidth,
      H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let m = {
      x: 0,
      y: 0
    };

    //Get Mouse position
    canvas.addEventListener('mousemove', (e) => {
      const bounds = canvas.getBoundingClientRect();
      m.x = e.clientX - bounds.left;
      m.y = e.clientY - bounds.top;
    });

    // Some variables for later use
    let particleCount = 120,
      particles = [],
      minDist = 60;

    // Function to paint the canvas black
    let paintCanvas = () => {
      // This will create a rectangle of white color from the
      // top left (0,0) to the bottom right corner (W,H)
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillRect(0, 0, W, H);
    };

    // Now the idea is to create some particles that will attract
    // each other when they come close. We will set a minimum
    // distance for it and also draw a line when they come
    // close to each other.

    // The attraction can be done by increasing their velocity as
    // they reach closer to each other

    // Let's make a function that will act as a class for
    // our particles.

    function Particle() {
      // Position them randomly on the canvas
      // Math.random() generates a random value between 0
      // and 1 so we will need to multiply that with the
      // canvas width and height.
      this.x = Math.random() * W;
      this.y = Math.random() * H;

      // Now the radius of the particles. I want all of
      // them to be equal in size so no Math.random() here..
      this.radius = 3;

      // We would also need some velocity for the particles
      // so that they can move freely across the space
      this.maxX = W - this.radius;
      this.maxY = H - this.radius;

      this.targetX = Math.random() * this.maxX;
      this.targetY = Math.random() * this.maxY;

      const speed = Math.random() * 2000 + 2000;
      this.vx = (this.targetX - this.x) / speed;
      this.vy = (this.targetY - this.y) / speed;

      // This is the method that will draw the Particle on the
      // canvas. It is using the basic fillStyle, then we start
      // the path and after we use the `arc` function to
      // draw our circle. The `arc` function accepts four
      // parameters in which first two depicts the position
      // of the center point of our arc as x and y coordinates.
      // The third value is for radius, then start angle,
      // end angle and finally a boolean value which decides
      // whether the arc is to be drawn in counter clockwise or
      // in a clockwise direction. False for clockwise.
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 144, 144, 1.0)';

        // Fill the color to the arc that we just created
        ctx.fill();
      };
    }

    // Time to push the particles into an array
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Function to draw everything on the canvas that we'll use when
    // animating the whole scene.
    let draw = () => {
      // Call the paintCanvas function here so that our canvas
      // will get re-painted in each next frame
      paintCanvas();
      // Call the function that will draw the balls using a loop
      for (var i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.draw();
      }

      //Finally call the update function
      update();
    };

    // Give every particle some life
    let update = () => {

      // In this function, we are first going to update every
      // particle's position according to their velocities
      if (runAnimation) {
        for (let i = 0; i < particles.length; i++) {
          let p = particles[i];
          popClose(p, m, i);

          if (p.frozen) {
            p.radius = 10;
          }

          if (!p.frozen) {

            //Set default velocity
            p.radius = 3;

            // Change the velocities
            p.x += p.vx;
            p.y += p.vy;

            // We don't want to make the particles leave the
            // area, so just change their position when they
            // touch the walls of the window

            if (p.x > W || p.x < 0) {
              p.vx = -p.vx;
              p.x += p.vx;
            } else if (p.y || p.y < 0) {
              p.vy = -p.vy;
              p.y += p.vy;
            }
          }

          // Now we need to make them attract each other
          // so first, we'll check the distance between
          // them and compare it to the minDist we have
          // already set

          // We will need another loop so that each
          // particle can be compared to every other particle
          // except itself
          for (let j = i + 1; j < particles.length; j++) {
            let p2 = particles[j];
            distance(p, p2);
          }
        }
      }
    };

    // Distance calculator between two particles
     let distance = (p1, p2) => {
      let dist,
        dx = Math.abs(p1.x - p2.x),
        dy = Math.abs(p1.y - p2.y);

      dist = Math.sqrt(dx * dx + dy * dy);

      // Draw the line when distance is smaller
      // then the minimum distance
      if (dist <= minDist) {

        // Draw the line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 144, 144, 1.0)';
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();

      }
    };

    let closestIndex;
    function popClose(p, m, i) {
      var dist,
        dx = Math.abs(p.x - m.x),
        dy = Math.abs(p.y - m.y);

      dist = Math.sqrt(dx * dx + dy * dy);

      // Draw the line when distance is smaller
      // then the minimum distance
      if (dist <= p.radius * 1.5) {
        closestIndex = i;
        particles[closestIndex].frozen = true;
      } else {
        if (closestIndex != undefined) {
          particles[closestIndex].frozen = false;
        }
      }
    }

    let animloop = () => {
      if (this.state.resized) {
          W = window.innerWidth,
          H = window.innerHeight;
          canvas.width = W;
          canvas.height = H;
          this.setState({ resized: false });
      }

      draw();
      return window.requestAnimationFrame(animloop);
    };

    let runAnimation = true;
    return animloop();
  }

  render() {
    return (
      <canvas className={canvas} id="matrix"></canvas>
    );
  }
}

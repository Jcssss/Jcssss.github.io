import Particle from './Particle';

/* Particles have the following behavior:
    1. Particles are created each time the cursor moves
    2. Particles begin with a random size, color, speed and direction
    3. Each frame, particles...
        a. Move in their assigned direction
        b. Decrease their speed (deaccelerate)
        c. Decrease their radius (At 0 radius, the particle is removed)
*/

var canvas;
var ctx;
var mouseX = 0;
var mouseY = 0;
var particles = [];
var startTime = 0;
var colorCounter = 0;
var onCanvas = true;

const ppf = 1; // particles per frame
const fps = 60; // frame per second
const distForMaxModifier = 100; // 
const framesPerRadialDecrease = 10;
const distToFill = 5;

const hslLightness = '60%';
const hslSaturation = '90%';

var timeStart;

function resetCanvasDimensions () {
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
}

// initializes the system
const initParticleEffect = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    resetCanvasDimensions();

    // initializes particle creation
    document.onmousemove = handleMouseMove;
    window.addEventListener("resize", resetCanvasDimensions)
    document.addEventListener("mouseleave", () => {onCanvas = false});
    document.addEventListener("mouseenter", (event) => {
        onCanvas = true
        mouseX = event.x
        mouseY = event.y
    });

    // starts animating existing particles
    startTime = document.timeline.currentTime;
    window.requestAnimationFrame((t) => draw(t));
}

// Animates and draws the particles
function draw (curTime) {
    var x;
    var y;

    // calculates time passed and frames required
    var timePassed = curTime - startTime;
    var framesPassed = timePassed * fps/1000;
    startTime = curTime;

    // for each particle, erases the previous drawing and updates variables
    particles.forEach((particle) => {
        x = particle.x - particle.radius - 1;
        y = particle.y - particle.radius - 1;
        ctx.clearRect( x, y, 2 * particle.radius + 2, 2 * particle.radius + 2);
        particle.update(framesPassed);
    });

    // removes all particles that have faded completely
    particles = particles.filter((part) => part.radius > 0);

    timeStart = Date.now();
    // for each particle, draws the particle
    particles.forEach((particle) => {
        particle.draw(ctx);
    });
    console.log(Date.now() - timeStart);

    // begins next frame
    window.requestAnimationFrame((t) => draw(t));
}

// Returns an array containing a variety of directions that particles should move in
function getDirections(dirBias, travelDistance) {
    var directions = [];
    var tempDirection = [0, 0];

    var startAngle = Math.acos(dirBias[0]);
    startAngle = (dirBias[1] < 0)? 2 * Math.PI - startAngle: startAngle;

    var modifier = Math.min(travelDistance / distForMaxModifier, 1);

    var angleOptionOffset = Math.PI * Math.max(1 - modifier, 0.1);

    // offests the angles by a certain amount
    var angle = startAngle - angleOptionOffset;
    angle += Math.random() * 2 * angleOptionOffset / ppf;

    // Creates a constant number of particles
    for (var i = 0 ; i < ppf ; i++) {

        // Direction is represented as a normalized 2D Vector
        tempDirection = new Array(2);
        tempDirection[0] = Math.cos(angle) + dirBias[0] * modifier;
        tempDirection[1] = Math.sin(angle) + dirBias[1] * modifier;

        directions.push(tempDirection);
        angle += 2 * angleOptionOffset / ppf;
    }

    return directions;
}

function createParticles(dirBias, travelDistance, x, y) {
    var directions = getDirections(dirBias, travelDistance);
    var speed, size = [0, 0];
    var color = 0;

    for (var i = 0 ; i < directions.length ; i++) {
        speed = 1 + Math.random() * 0.4;
        size = 3 + Math.random() * 8;

        // gradient color scheme
        colorCounter = (colorCounter === 359)? 0 : colorCounter + 1;
        color = colorCounter.toString();

        // random color scheme
        //color = (Math.random() * 360).toString();
        color = `hsl(${color}, ${hslSaturation}, ${hslLightness})`;

        particles.push(
            new Particle(x, y, size, color, framesPerRadialDecrease, directions[i], speed)
        );
    }
}

function getTravelDistanceNormalized (newX, newY) {
    var distX = mouseX - newX;
    var distY = mouseY - newY;
    var vectLength = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

    return [distX / vectLength, distY / vectLength];
}

function getTravelDistanceLength (newX, newY) {
    var distX = mouseX - newX;
    var distY = mouseY - newY;
    return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
}

const handleMouseMove = (event) => {
    var oppDirection = getTravelDistanceNormalized(event.pageX, event.pageY);
    var travelDistance = getTravelDistanceLength(event.pageX, event.pageY);

    var mainDirection = [-oppDirection[0], -oppDirection[1]];
    var lastX = mouseX;
    var lastY = mouseY;
    var temp = travelDistance;

    while (onCanvas && temp > distToFill) {
        lastX += mainDirection[0] * distToFill;
        lastY += mainDirection[1] * distToFill;

        createParticles(oppDirection, travelDistance, lastX, lastY);

        temp -= distToFill;
    }

    mouseX = event.pageX;
    mouseY = event.pageY;
    createParticles(oppDirection, travelDistance, mouseX, mouseY);
} 

export default initParticleEffect;
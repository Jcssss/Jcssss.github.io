import Particle from './Particle';

var canvas;
var ctx;
var mouseX = 0;
var mouseY = 0;
var particles = [];
var startTime = 0;

const ppf = 1;
const fps = 60;
const velocityScale = 5; 
const spreadSuppression = 0.5;
const framesPerRadialDecrease = 10;

const hslLightness = '60%';
const hslSaturation = '90%';

const initParticleEffect = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    document.onmousemove = handleMouseMove;

    startTime = document.timeline.currentTime;
    window.requestAnimationFrame((t) => draw(t));
}

function draw (curTime) {
    var x;
    var y;

    var timePassed = curTime - startTime;
    var framesPassed = timePassed * fps/1000;
    startTime = curTime;

    particles.forEach((particle) => {
        x = particle.x - particle.radius - 1;
        y = particle.y - particle.radius - 1;
        ctx.clearRect( x, y, 2 * particle.radius + 2, 2 * particle.radius + 2);
        particle.update(framesPassed);
    });

    particles = particles.filter((part) => part.radius > 0);

    particles.forEach((particle) => {
        particle.draw(ctx);
    });

    window.requestAnimationFrame((t) => draw(t));
}

function getDirections(dirBias, travelDistance) {
    var directions = [];
    var angle = Math.random() * 2 * Math.PI / ppf;
    var tempDirection = [0, 0];
    var indexToSuppress = 0;

    var dirBiasEmphasis = Math.min(travelDistance / velocityScale, 2);

    for (var i = 0 ; i < ppf ; i++) {
        tempDirection = new Array(2);
        tempDirection[0] = Math.cos(angle) + dirBias[0] * dirBiasEmphasis;
        tempDirection[1] = Math.sin(angle) + dirBias[1] * dirBiasEmphasis;

        indexToSuppress = (Math.abs(dirBias[0]) > Math.abs(dirBias[1]))? 1: 0;
        tempDirection[indexToSuppress] *= spreadSuppression;

        directions.push(tempDirection);
        angle += 2 * Math.PI / ppf;
    }

    return directions;
}

function createParticles(dirBias, travelDistance) {
    var directions = getDirections(dirBias, travelDistance);
    var speed, size = [0, 0];
    var color = 0;

    for (var i = 0 ; i < directions.length ; i++) {
        speed = 1 + Math.random() * 0.4;
        size = 3 + Math.random() * 8;

        color = (Math.random() * 360).toString();
        color = `hsl(${color}, ${hslSaturation}, ${hslLightness})`;
        console.log(color);

        particles.push(
            new Particle(mouseX, mouseY, size, color, framesPerRadialDecrease, directions[i], speed)
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
    var dirBias = getTravelDistanceNormalized(event.pageX, event.pageY);
    var travelDistance = getTravelDistanceLength(event.pageX, event.pageY);

    mouseX = event.pageX;
    mouseY = event.pageY;

    createParticles(dirBias, travelDistance);
}

export default initParticleEffect;
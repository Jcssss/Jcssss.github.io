import Particle from './Particle';

var canvas;
var ctx;
var mouseX = 0;
var mouseY = 0;
var particles = [];
var frame = 0;
var ppf = 5;

const initParticleEffect = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    document.onmousemove = handleMouseMove;
    setInterval(draw, 10);
}

function clear () {
    ctx.beginPath();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.closePath();
}

function draw () {
    frame ++;

    particles.forEach((particle) => {
        var x = particle.x - particle.radius - 1;
        var y = particle.y - particle.radius - 1;
        ctx.clearRect( x, y, 2 * particle.radius + 2, 2 * particle.radius + 2);
        particle.update(frame);
    });

    particles = particles.filter((part) => part.radius > 0);

    particles.forEach((particle) => {
        particle.draw(ctx);
    });
}

function getDirections() {
    var directions = [];
    var angle = Math.random() * 2 * Math.PI / ppf;

    for (var i = 0 ; i < ppf ; i++) {
        directions.push([Math.cos(angle), Math.sin(angle)]);
        angle += 2 * Math.PI / ppf;
    }

    return directions;
}

function createParticles() {
    var directions = getDirections();
    var speed, size = [0, 0];

    for (var i = 0 ; i < directions.length ; i++) {
        speed = 0.1 + Math.random() * 0.2;
        size = 5 + Math.random() * 10;

        particles.push(
            new Particle(mouseX, mouseY, size, 'FF0000', 20, directions[i], speed)
        );
    }
}

const handleMouseMove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    createParticles();
}

export default initParticleEffect;
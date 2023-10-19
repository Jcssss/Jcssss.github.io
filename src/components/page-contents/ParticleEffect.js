import Particle from './Particle';

var canvas;
var ctx;
var mouseX = 0;
var mouseY = 0;
var particles = [];
var lastX = 0;
var lastY = 0;
var dps = 30;
var counter = 0;

const initParticleEffect = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    document.onmousemove = handleMouseMove;
    setInterval(draw, 20);
}

function clear () {
    ctx.beginPath();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.closePath();
}
function draw () {
    clear();

    particles.forEach((particle, i) => {
        particle.draw(ctx);
        particle.update();
        if (particle.radius === 0) {
            particles = particles.filter((part) => part.exist === true);
        }
    });

    console.log(particles);
    ctx.stroke();
    ctx.fill();
}

function createParticle() {
    var par = new Particle(mouseX, mouseY, 20, 'FF0000', 1);
    particles.push(par);
}

const getDistance = () => {
    return Math.sqrt( Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2))
}

const handleMouseMove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    if (getDistance() > 20) {
        lastX = mouseX;
        lastY = mouseY;
        createParticle();
    }
}

export default initParticleEffect;
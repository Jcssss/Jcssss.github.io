import Particle from './Particle';

var canvas;
var ctx;
var mouseX;
var mouseY;
var particles = [];

const initParticleEffect = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    document.onmousemove = handleMouseMove;
    setInterval(draw, 20);
}

function clear () {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}
function draw () {
    clear();

    particles.forEach((particle,i) => {
        particle.draw(ctx);
        particle.update();
        if (particle.radius === 0) {
            particle = particle.slice(0, i).concat(particle.slice(-i));
        }
    });

    ctx.stroke();
    ctx.fill();
}

function createParticle() {
    var par = new Particle(mouseX, mouseY, 6, 'FF0000', 0.00001);
    particles.push(par);
}

const handleMouseMove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    createParticle();
}

export default initParticleEffect;
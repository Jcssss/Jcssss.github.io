
class Particle {
    constructor (x, y, radius, color, rod, direction, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.rod = rod;
        this.direction = direction;
        this.speed = speed;
    }
    
    draw (ctx) {
        ctx.fillStyle = `#${this.color}`
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    update () {
        this.radius -= 1/this.rod;
        this.x += this.direction[0] * this.speed;
        this.y += this.direction[1] * this.speed;
    }
}

export default Particle;
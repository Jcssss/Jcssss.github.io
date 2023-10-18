
class Particle {
    constructor (x, y, radius, color, rod) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.rod = rod;
    }
    
    draw (ctx) {
        ctx.fillStyle = `#${this.color}`
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    }

    update () {
        this.radius -= this.rod;
    }
}

export default Particle;
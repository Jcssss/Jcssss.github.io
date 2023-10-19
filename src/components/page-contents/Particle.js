
class Particle {
    constructor (x, y, radius, color, rod) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.rod = rod;
        this.exist = true;
    }
    
    draw (ctx) {
        ctx.fillStyle = `#${this.color}`
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
    }

    update () {
        this.radius -= this.rod;
        if (this.radius === 0) {
            this.exist = false;
        }
    }
}

export default Particle;
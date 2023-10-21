
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
    }

    update (frame) {
        if (frame % this.rod == 0) {
            this.radius--;
        }
    }
}

export default Particle;
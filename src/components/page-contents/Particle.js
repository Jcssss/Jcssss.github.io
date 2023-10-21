
class Particle {
    constructor (x, y, radius, color, rod, direction, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.rod = rod;
        this.direction = direction;
        this.speed = speed;
        this.accel = 0.005;
    }
    
    draw (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    update (framesPassed) {
        this.radius -= 1/this.rod * framesPassed;
        this.x += this.direction[0] * this.speed * framesPassed;
        this.y += this.direction[1] * this.speed * framesPassed;
        
        this.speed -= this.accel * framesPassed;
        this.speed = Math.max(0.001, this.speed);

        this.rod -= 0.1 * framesPassed;
        this.accel += 0.001;
    }
}

export default Particle;
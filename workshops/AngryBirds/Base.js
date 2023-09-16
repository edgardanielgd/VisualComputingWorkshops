const { Vector } = Matter;

class Base {
    static BIRDS_COLLISION_DAMAGE = 0.5;
    static BOX_COLLISION_DAMAGE = 0.002;
    static WALLS_COLLISION_DAMAGE = 0.2;

    constructor({ life, canCollide = true } = {}) {
        this.life = life;
        this.body = null;

        // Sometimes we don't want to collide with other bodies
        this.canCollide = canCollide;
    }


    update(birds, walls, boxes) {

        if (!this.canCollide) return;

        const calculateDamage = (extBody, factor) => {
            let extMomentum = Vector.mult(extBody.velocity, extBody.mass);
            let selfMomentum = Vector.mult(this.body.velocity, this.body.mass);
            let relativeMomentum = Vector.sub(extMomentum, selfMomentum);

            let magnitude = Vector.magnitude(relativeMomentum) * factor;

            return magnitude;
        };

        for (const bird of birds) {
            if( ! bird.canCollide ) continue;
            if (Matter.SAT.collides(this.body, bird.body).collided) {
                this.life -= calculateDamage(bird.body, Base.BIRDS_COLLISION_DAMAGE);
            }
        }

        for (const wall of walls) {
            if( ! wall.canCollide ) continue;
            if (Matter.SAT.collides(this.body, wall.body).collided) {
                this.life -= Base.WALLS_COLLISION_DAMAGE * Vector.magnitude(this.body.velocity);
            }
        }

        for (const box of boxes) {
            if( ! box.canCollide ) continue;
            if (Matter.SAT.collides(this.body, box.body).collided) {
                this.life -= calculateDamage(box.body, Base.BOX_COLLISION_DAMAGE);
            }
        }
    }
}

export default Base;
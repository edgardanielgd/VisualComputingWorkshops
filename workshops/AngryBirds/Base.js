const { Vector } = Matter;

class Base {
    static BIRDS_COLLISION_DAMAGE = 0.5;
    static BOX_COLLISION_DAMAGE = 0.002;
    static WALLS_COLLISION_DAMAGE = 0.2;

    update(birds, walls, boxes) {

        const calculateDamage = (extBody, factor) => {
            let extMomentum = Vector.mult(extBody.velocity, extBody.mass);
            let selfMomentum = Vector.mult(this.body.velocity, this.body.mass);
            let relativeMomentum = Vector.sub(extMomentum, selfMomentum);

            let magnitude = Vector.magnitude(relativeMomentum) * factor;

            return magnitude;
        };

        for (const bird of birds) {
            if (Matter.SAT.collides(this.body, bird.body).collided) {
                this.life -= calculateDamage(bird.body, Base.BIRDS_COLLISION_DAMAGE);
            }
        }

        for (const wall of walls) {
            if (Matter.SAT.collides(this.body, wall.body).collided) {
                this.life -= Base.WALLS_COLLISION_DAMAGE * Vector.magnitude(this.body.velocity);
            }
        }

        for (const box of boxes) {
            if (Matter.SAT.collides(this.body, box.body).collided) {
                this.life -= calculateDamage(box.body, Base.BOX_COLLISION_DAMAGE);
            }
        }
    }
}

export default Base;
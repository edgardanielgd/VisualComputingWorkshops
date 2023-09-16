import config from '/workshops/AngryBirds/config.js';
import Ground from '/workshops/AngryBirds/Ground.js';

const { Bounds, Constraint, Sleeping, World } = Matter;

const DROP_ON_DISTANCE = true;

class SlingShot {
    constructor({ x, y, w, h, xa, ya, mouse, world, img, max_distance = 100, onBirdSelection = null } = {}) {

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.xa = xa;
        this.ya = ya;
        this.world = world;
        this.img = img;

        this.currentBird = null;

        this.constraint = null;

        this.dragging = false;

        // Create a custom mouse constraint
        this.mouse = mouse;

        // Max distance constraint
        this.max_distance = max_distance;

        // Callback for bird selection, first time a user moves a bird
        this.onBirdSelection = onBirdSelection;
    }

    show(sk, boundaries) {

        sk.push();

        const should_not_show = this.x - this.w / 2 < boundaries.left ||
            this.x + this.w / 2 > boundaries.right ||
            this.y - this.h / 2 < boundaries.top ||
            this.y + this.h / 2 > boundaries.bottom;

        if (should_not_show) return;

        if (this.currentBird != null) {
            sk.stroke(0);
            sk.strokeWeight(4);
            sk.line(
                this.xa, this.ya,
                this.currentBird.body.position.x, this.currentBird.body.position.y
            );
            sk.line(
                this.xa + this.w / 10, this.ya,
                this.currentBird.body.position.x, this.currentBird.body.position.y
            );
        }

        if (this.img) {
            sk.imageMode(sk.CENTER);
            sk.image(this.img, this.x, this.y, this.w, this.h);
        }

        sk.pop();
    }

    update() {

        if (!this.currentBird) return;

        if (this.mouse.button === 0) {

            if (this.dragging) {
                Matter.Body.setPosition(this.currentBird.body, this.mouse.position);
            }

            if (Bounds.contains(this.currentBird.body.bounds, this.mouse.position)) {

                // Bird has been pressed
                if (this.onBirdSelection) {
                    this.onBirdSelection();
                }

                if (this.getDistance() > this.max_distance) {

                    if (!DROP_ON_DISTANCE) {
                        Matter.Body.setPosition(this.currentBird.body, { x: this.xa, y: this.ya });
                    } else {
                        this.detach();
                    }

                    this.dragging = false;
                } else {
                    this.dragging = true;
                }
            }
            else {
                this.dragging = false;
            }
        } else if (this.dragging) {

            if (this.getDistance() <= 30) {
                Matter.Body.setPosition(this.currentBird.body, { x: this.xa, y: this.ya });
            } else {
                // Drop only if there is distance between the bird and the sling
                this.detach();
            }
        }
    }

    hasBird() {
        return this.currentBird != null;
    }

    attach(bird) {
        if (this.constraint) {
            World.remove(this.world, this.constraint);
        }

        this.currentBird = bird;

        this.constraint = Constraint.create({
            pointA: { x: this.xa, y: this.ya },
            bodyB: this.currentBird.body,
            length: 5,
            stiffness: 0.005,
            damping: 0.01,
        });

        // Modify bird so that i won't collide with anything
        this.currentBird.body.collisionFilter = {
            ... this.currentBird.body.collisionFilter,
            mask: 0x0000,
        }

        World.add(this.world, this.constraint);
    }

    detach() {
        if (!this.currentBird || !this.constraint) return;

        // Modify bird so that i won't collide with anything
        this.currentBird.body.collisionFilter = {
            ... this.currentBird.body.collisionFilter,
            mask: 0xFFFF,
        }

        this.currentBird.canCollide = true;

        this.currentBird = null;
        World.remove(this.world, this.constraint);
        this.constraint = null;
        this.dragging = false;
    }

    getDistance() {
        if (this.currentBird) {
            const diffX = this.xa - this.currentBird.body.position.x;
            const diffY = this.ya - this.currentBird.body.position.y;

            const distance = Math.sqrt(diffX * diffX + diffY * diffY);

            return distance;
        }
    }

}

export default SlingShot;
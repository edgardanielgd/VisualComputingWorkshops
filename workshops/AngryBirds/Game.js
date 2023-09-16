import Bird from '/workshops/AngryBirds/Bird.js';
import Pig from '/workshops/AngryBirds/Pig.js';
import Box from '/workshops/AngryBirds/Box.js';
import SlingShot from '/workshops/AngryBirds/SlingShot.js';

import config from '/workshops/AngryBirds/config.js';

const { Engine, World, Mouse, Events, Vector } = Matter;

class Game {

    constructor({
        sk, canvas,
        width = 500, height = 500,
        offsetX = 0, offsetY = 0,
        backgroundImg,
        boxImg, glassImg, rockImg,
        pigImg, catapultImg,
        redImg, blueImg,
        yellowImg, bombImg, bigredImg
    } = {}) {
        this.birds = [];
        this.slingshot = null;
        this.boxes = [];
        this.pigs = [];
        this.walls = [];

        this.currentBirdIndex = 0;

        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.backgroundImg = backgroundImg;
        this.boxImg = boxImg;
        this.glassImg = glassImg;
        this.rockImg = rockImg;
        this.pigImg = pigImg;
        this.catapultImg = catapultImg;

        this.redImg = redImg;
        this.blueImg = blueImg;
        this.yellowImg = yellowImg;
        this.bombImg = bombImg;
        this.bigredImg = bigredImg;

        // Create matter.js stuff
        this.engine = Engine.create();
        this.world = this.engine.world;

        // Boolean flags to control animations and birds change
        this.levelInitialized = false;
        this.birdsMovingTrigger = false;

        this.canvas = canvas;

        this.mouseConstraint = null;
        this.pixelDensity = sk.pixelDensity();

        this.boundaries = {
            left: 0, right: this.width,
            top: 0, bottom: this.height
        };

        this.birdsData = [];
        this.targetBirds = null;

        // Reference to the flying bird, so that powerups can be applied here
        this.flyingBird = null;

        this.status = 0; // 0: playing, 1: win, 2: lose
    }

    initializeLevel(level) {

        this.levelInitialized = true;
        this.status = 0;

        // Drop the world
        World.clear(this.world);

        this.boxes = [];
        for (const box of level.boxes) {
            this.boxes.push(
                new Box({
                    x: box.x, y: box.y,
                    w: box.w, h: box.h,
                    img: (
                        box.type == "wood" ? this.boxImg :
                            (
                                box.type == "glass" ? this.glassImg : this.rockImg
                            )
                    ),
                    world: this.world,
                    life: box.life,
                    mass: box.life / 100,
                })
            );
        }

        this.pigs = [];
        for (const pig of level.pigs) {
            this.pigs.push(
                new Pig({
                    x: pig.x, y: pig.y,
                    r: pig.r, m: pig.m,
                    img: this.pigImg,
                    world: this.world,
                    life: pig.life,
                })
            );
        }

        this.walls = [];
        for (const wall of level.walls) {
            this.walls.push(
                new Box({
                    x: wall.x, y: wall.y,
                    w: wall.w, h: wall.h,
                    world: this.world,
                    options: {
                        isStatic: true
                    }
                })
            );
        }


        const mouse = Mouse.create(this.canvas.elt);
        mouse.pixelRatio = this.pixelDensity;

        // Set configuration buttons offset
        const mouseOffset = Matter.Vector.create(-this.offsetX, 0);
        Mouse.setOffset(mouse, mouseOffset);

        const slingshot_data = level.slingshot;


        this.slingshot = new SlingShot({
            x: slingshot_data.x, y: slingshot_data.y,
            w: slingshot_data.w, h: slingshot_data.h,
            xa: slingshot_data.xa, ya: slingshot_data.ya,
            img: this.catapultImg,
            world: this.world, mouse: mouse,
            max_distance: 150,

            // Callback for bird selection, first time a user moves a bird
            onBirdSelection: () => {
                this.flyingBird = this.slingshot.currentBird;
            }
        });

        this.currentBirdIndex = 0;

        this.birds = [];
        this.birdsData = [];
        for (let i = 0; i < level.birds.length; i++) {
            let element = level.birds[i];
            element.radius = element.radius || 25;
            element.mass = element.mass || 5;

            element.x = this.slingshot.x + (i * 70);
            element.y = this.slingshot.y + this.slingshot.h / 2 - element.radius;

            element.r = 0;

            let img = null;
            switch (element.type) {
                case 'red':
                    img = this.redImg;
                    break;
                case 'blue':
                    img = this.blueImg;
                    break;
                case 'yellow':
                    img = this.yellowImg;
                    break;
                case 'bomb':
                    img = this.bombImg;
                    break;
                case 'bigred':
                    img = this.bigredImg;
                    break;
                default:
                    img = this.redImg;
                    break;
            };

            element.img = img;

            this.birdsData.push(element);
        }

        Events.on(this.engine, 'afterUpdate',
            () => {
                this.onEnginePreUpdate();
            }
        );

        Events.on(this.engine, 'afterUpdate',
            () => {
                this.onEngineUpdate();
            }
        );
    }

    draw(sk) {
        if (!this.levelInitialized) return;

        sk.push();
        sk.rect(this.offsetX, this.offsetY, this.width, this.height);

        Engine.update(this.engine);

        sk.translate(this.offsetX, 0);
        sk.image(
            this.backgroundImg,
            0, 0, this.width, this.height
        );

        this.slingshot.show(sk, this.boundaries);

        for (const box of this.boxes) {
            box.show(sk, this.boundaries);
        }
        for (const bird of this.birds) {
            bird.show(sk, this.boundaries);
        }
        for (const pig of this.pigs) {
            pig.show(sk, this.boundaries);
        }
        for (const wall of this.walls) {
            wall.show(sk, this.boundaries);
        }

        // Draw remaining birds in queue with notation
        for (let i = this.currentBirdIndex; i < this.birdsData.length; i++) {
            const birdData = this.birdsData[i];

            Bird.drawBird(
                sk,
                birdData.x,
                birdData.y,
                birdData.radius,
                birdData.r,
                birdData.img,
                null, null,
                this.boundaries
            );

            if (this.birdsMovingTrigger) {

                // Attach bird when it is close enough to the slingshot
                if (i == this.currentBirdIndex && Math.abs(birdData.x - this.slingshot.x) < 5) {

                    this.setNextBird();
                    this.birdsMovingTrigger = false;
                }

                // Update birds movement
                birdData.x -= 0.5;
                birdData.r -= 0.1;
            }
        }

        // Finally draw the BIG text in the middle
        sk.fill(255, 0, 0);
        sk.textSize(50);
        sk.textAlign(sk.CENTER, sk.CENTER);

        if (this.status == 1) {
            sk.text("YOU WIN!", this.width / 2, this.height / 2);
        } else if (this.status == 2) {
            sk.text("YOU LOSE!", this.width / 2, this.height / 2);
        }

        sk.pop();
    }

    onEnginePreUpdate() {
        this.slingshot.update();
    }

    setNextBird() {
        const birdData = this.birdsData[this.currentBirdIndex++];

        const bird = new Bird({
            x: this.slingshot.xa, y: this.slingshot.ya,
            r: birdData.radius, m: birdData.mass,
            img: birdData.img,
            life: birdData.mass * 100,
            world: this.world,
            collision: config.BIRD_CATEGORY,
            type: birdData.type
        });

        this.birds.push(bird);
        this.slingshot.attach(bird);
    }

    onPowerup() {

        // Bird shouldn't have lost any life (collided with anything
        if (this.flyingBird && this.flyingBird.life == this.flyingBird.initial_life) {
            switch (this.flyingBird.type) {
                case 'yellow':
                    Matter.Body.setVelocity(this.flyingBird.body, Vector.mult(this.flyingBird.body.velocity, 1.5));
                    break;
                case 'blue':
                    // Split the bird into 3 (Preserve the one at the middle)
                    let newBird = new Bird({
                        x: this.flyingBird.body.position.x,
                        y: this.flyingBird.body.position.y,
                        r: this.flyingBird.body.circleRadius,
                        m: this.flyingBird.body.mass,
                        img: this.flyingBird.img,
                        life: this.flyingBird.life,
                        world: this.world,
                        collision: config.BIRD_CATEGORY,
                        type: this.flyingBird.type
                    });

                    // Rotate one bird to left
                    Matter.Body.setVelocity(newBird.body, Vector.rotate(this.flyingBird.body.velocity, -Math.PI / 32));
                    this.birds.push(newBird);

                    newBird = new Bird({
                        x: this.flyingBird.body.position.x,
                        y: this.flyingBird.body.position.y,
                        r: this.flyingBird.body.circleRadius,
                        m: this.flyingBird.body.mass,
                        img: this.flyingBird.img,
                        life: this.flyingBird.life,
                        world: this.world,
                        collision: config.BIRD_CATEGORY,
                        type: this.flyingBird.type
                    });

                    // Rotate one bird to left
                    Matter.Body.setVelocity(newBird.body, Vector.rotate(this.flyingBird.body.velocity, Math.PI / 32));
                    this.birds.push(newBird);

                    break;

                case 'bomb':
                    // Explode the bird
                    for (const item of this.boxes.concat(this.pigs).concat(this.birds)) {



                        if (item == this.flyingBird) continue;

                        const d = 0.2 * Matter.Vector.magnitude(
                            Matter.Vector.sub(this.flyingBird.body.position, item.body.position)
                        );

                        item.life -= d;
                    }
                    break;
            }

            this.flyingBird = null;
        }
    }

    onEngineUpdate() {
        const pigs_clone = [...this.pigs];
        for (let i = 0; i < pigs_clone.length; i++) {
            const pig = pigs_clone[i];
            pig.update(this.birds, this.walls, this.boxes);
            if (pig.life <= 0) {
                World.remove(this.world, pig.body);
                this.pigs.splice(i, 1);
            }
        }

        const boxes_clone = [...this.boxes];
        for (let i = 0; i < boxes_clone.length; i++) {
            const box = boxes_clone[i];
            box.update(this.birds, this.walls, this.boxes);
            if (box.life <= 0) {
                World.remove(this.world, box.body);
                this.boxes.splice(i, 1);
            }
        }

        const birds_clone = [...this.birds];
        for (let i = 0; i < birds_clone.length; i++) {
            const bird = birds_clone[i];
            bird.update(this.birds, this.walls, this.boxes);
            if (bird.life <= 0) {
                World.remove(this.world, bird.body);
                this.birds.splice(i, 1);
            }
        }

        // Check if the game is over
        if (this.pigs.length == 0) {
            this.status = 1;
        } else if (this.currentBirdIndex >= this.birdsData.length) {
            // All birds have been used, lets check if birds are moving
            let moving = false;
            for (const bird of this.birds) {
                if (bird.body.speed > 0.3 || this.slingshot.currentBird) moving = true;
            }

            if (!moving) {
                this.status = 2;
            }
        }

        // Set the current bird
        if (this.currentBirdIndex < this.birdsData.length && !this.slingshot.currentBird && !this.birdsMovingTrigger) {
            this.birdsMovingTrigger = true;
        }
    }
}

export default Game;
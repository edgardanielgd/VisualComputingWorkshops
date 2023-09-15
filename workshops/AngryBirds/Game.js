import Bird from '/workshops/AngryBirds/Bird.js';
import Pig from '/workshops/AngryBirds/Pig.js';
import Box from '/workshops/AngryBirds/Box.js';
import SlingShot from '/workshops/AngryBirds/SlingShot.js';

import config from '/workshops/AngryBirds/config.js';

const { Engine, World, Mouse, MouseConstraint, Events } = Matter;

class Game {

    constructor({
        sk, canvas,
        width = 500, height = 500,
        offsetX = 0, offsetY = 0,
        backgroundImg,
        boxImg, pigImg, catapultImg,
        redImg, blueImg,
        yellowImg, bombImg
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
        this.pigImg = pigImg;
        this.catapultImg = catapultImg;

        this.redImg = redImg;
        this.blueImg = blueImg;
        this.yellowImg = yellowImg;
        this.bombImg = bombImg;

        // Create matter.js stuff
        this.engine = Engine.create();
        this.world = this.engine.world;

        this.levelInitialized = false;
        this.birdLaunchedTrigger = false;

        this.canvas = canvas;

        this.mouseConstraint = null;
        this.pixelDensity = sk.pixelDensity();

        this.boundaries = {
            left: 0, right: this.width,
            top: 0, bottom: this.height
        };

        this.birdsData = null;
    }

    initializeLevel(level) {

        this.levelInitialized = true;

        // Drop the world
        World.clear(this.world);

        this.boxes = [];
        for (const box of level.boxes) {
            this.boxes.push(
                new Box({
                    x: box.x, y: box.y,
                    w: box.w, h: box.h,
                    img: this.boxImg,
                    world: this.world,
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
                    world: this.world
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

        this.birds = [];

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
            max_distance: 150
        });

        this.birdsData = level.birds;

        this.currentBirdIndex = 0;

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
            let actual_index = i - this.currentBirdIndex;
            let birdImage = null;

            switch (this.birdsData[i].type) {
                case 'red':
                    birdImage = this.redImg;
                    break;
                case 'blue':
                    birdImage = this.blueImg;
                    break;
                case 'yellow':
                    birdImage = this.yellowImg;
                    break;
                case 'bomb':
                    birdImage = this.bombImg;
                    break;
                default:
                    birdImage = this.redImg;
                    break;
            };
            Bird.drawBird(
                sk,
                this.slingshot.x + (actual_index * 50),
                this.slingshot.y + this.slingshot.h / 2 - 25,
                25, 0,
                birdImage,
                this.boundaries
            );
        }

        sk.pop();
    }

    onEnginePreUpdate() {
        this.slingshot.update();
    }

    setNextBird() {
        const birdData = this.birdsData[this.currentBirdIndex++];

        let birdImage = null;
        switch (birdData.type) {
            case 'red':
                birdImage = this.redImg;
                break;
            case 'blue':
                birdImage = this.blueImg;
                break;
            case 'yellow':
                birdImage = this.yellowImg;
                break;
            case 'bomb':
                birdImage = this.bombImg;
                break;
            default:
                birdImage = this.redImg;
                break;
        };

        const bird = new Bird({
            x: this.slingshot.xa, y: this.slingshot.ya,
            r: 25, m: 5,
            img: birdImage,
            world: this.world,
            collision: config.BIRD_CATEGORY,
            type: birdData.type
        });

        this.birds.push(bird);
        this.slingshot.attach(bird.body);

        this.birdLaunchedTrigger = false;
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

        // Set the current bird
        if (this.currentBirdIndex < this.birdsData.length && !this.slingshot.currentBird && !this.birdLaunchedTrigger) {
            this.birdLaunchedTrigger = true;
            setTimeout(() => {
                this.setNextBird();
            }, 5000);
        }
    }
}

export default Game;
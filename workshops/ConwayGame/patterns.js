const patterns = {

    // Translatable patterns
    pentaDecathlonPattern: {
        name: "Penta-decathlon",
        type: "translatable",
        width: 10,
        height: 3,
        pattern: [
            [0, 1], [1, 1], [2, 0], [2, 2],
            [3, 1], [4, 1], [5, 1], [6, 1],
            [7, 0], [7, 2], [8, 1], [9, 1]
        ]
    },
    pulsarPattern: {
        name: "Pulsar",
        type: "translatable",
        width: 13,
        height: 13,
        pattern: [
            [2, 0], [3, 0], [4, 0], [8, 0], [9, 0], [10, 0],
            [2, 5], [3, 5], [4, 5], [8, 5], [9, 5], [10, 5],
            [2, 7], [3, 7], [4, 7], [8, 7], [9, 7], [10, 7],
            [2, 12], [3, 12], [4, 12], [8, 12], [9, 12], [10, 12],

            [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
            [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
            [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
            [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10]
        ]
    },
    blockPattern: {
        name: "Block",
        type: "translatable",
        width: 2,
        height: 2,
        pattern: [
            [0, 0], [0, 1],
            [1, 0], [1, 1]
        ]
    },
    snakePattern: {
        name: "Snake",
        type: "translatable",
        width: 19,
        height: 15,
        pattern: [
            [0, 8], [1, 8], [1, 7], [1, 6],
            [2, 5], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
            [4, 11], [5, 11],
            [5, 10], [5, 9], [5, 8], [5, 7], [5, 6], [5, 5], [5, 4], [5, 3],
            [6, 2], [7, 2],
            [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10], [7, 11], [7, 12], [7, 13],
            [8, 14], [9, 14],
            [9, 13], [9, 12], [9, 11], [9, 10], [9, 9], [9, 8], [9, 7], [9, 6], [9, 5], [9, 4], [9, 3], [9, 2], [9, 1], [9, 0], [10, 0],
            [11, 1], [10, 12], [11, 11], [11, 10], [11, 9], [11, 8], [11, 7], [11, 6], [11, 5], [11, 4], [11, 3], [11, 2],
            [12, 12], [13, 11], [13, 10], [13, 9], [13, 8], [13, 7], [13, 6], [13, 5], [13, 4], [13, 3],
            [14, 3], [15, 4], [15, 9], [15, 8], [15, 7], [15, 6], [15, 5],
            [16, 9], [17, 8], [17, 7], [16, 6], [18, 6],
        ]
    },
    beeHivePattern: {
        name: "BeeHive",
        type: "translatable",
        width: 4,
        height: 3,
        pattern: [
            [0, 1], [0, 2],
            [1, 0], [1, 3],
            [2, 1], [2, 2]
        ]
    },
    loafPattern: {
        name: "Loaf",
        type: "translatable",
        width: 4,
        height: 4,
        pattern: [
            [0, 1], [0, 2],
            [1, 0], [1, 3],
            [2, 1], [2, 3],
            [3, 2]
        ]
    },
    boatPattern: {
        name: "Boat",
        type: "translatable",
        width: 3,
        height: 3,
        pattern: [
            [0, 0], [0, 1],
            [1, 0], [1, 2],
            [2, 1]
        ]
    },
    tubPattern: {
        name: "Tub",
        type: "translatable",
        width: 3,
        height: 3,
        pattern: [
            [0, 1],
            [1, 0], [1, 2],
            [2, 1]
        ]
    },
    blinkerPattern: {
        name: "Blinker",
        type: "translatable",
        width: 3,
        height: 1,
        pattern: [
            [0, 0], [1, 0], [2, 0]
        ]
    },
    toadPattern: {
        name: "Toad",
        type: "translatable",
        width: 4,
        height: 2,
        pattern: [
            [0, 1], [0, 2], [0, 3],
            [1, 0], [1, 1], [1, 2]
        ]
    },
    beaconPattern: {
        name: "Beacon",
        type: "translatable",
        width: 4,
        height: 4,
        pattern: [
            [0, 0], [0, 1],
            [1, 0],
            [2, 3],
            [3, 2], [3, 3]
        ]
    },
    gliderPattern: {
        name: "Glider",
        type: "translatable",
        width: 3,
        height: 3,
        pattern: [
            [0, 1],
            [1, 2],
            [2, 0], [2, 1], [2, 2]
        ]
    },
    lightWeightSpaceshipPatternTranslatable: {
        name: "Light Weight Spaceship",
        type: "translatable",
        width: 5,
        height: 4,
        pattern: [
            [0, 1], [0, 4],
            [1, 0],
            [2, 0], [2, 4],
            [3, 0], [3, 1], [3, 2], [3, 3]
        ]
    },
    goesperGliderGunPattern: {
        name: "Gosper Glider Gun",
        type: "translatable",
        width: 36,
        height: 9,
        pattern: [
            [0, 4], [0, 5],
            [1, 4], [1, 5],
            [10, 4], [10, 5], [10, 6],
            [11, 3], [11, 7],
            [12, 2], [12, 8],
            [13, 2], [13, 8],
            [14, 5],
            [15, 3], [15, 7],
            [16, 4], [16, 5], [16, 6],
            [17, 5],
            [20, 2], [20, 3], [20, 4],
            [21, 2], [21, 3], [21, 4],
            [22, 1], [22, 5],
            [24, 0], [24, 1], [24, 5], [24, 6],
            [34, 2], [34, 3],
            [35, 2], [35, 3]
        ]
    },

    // Static patterns
    crossPattern: {
        name: "Snake",
        type: "static",
        updateCells: (target, dimX, dimY) => {
            // define cell for "Penta-decathlon" pattern 
            const centerX = Math.floor(dimX / 2);
            const centerY = Math.floor(dimY / 2);

            for (let col = 0; col < dimX; col++) {
                target[centerY][col] = true;
                target[centerY - 1][col] = true;
            }

            for (let row = 0; row < dimY; row++) {
                target[row][centerX] = true;
                target[row][centerX - 1] = true;
            }
        }
    },
    lightWeightSpaceshipPattern: {
        name: "Light Weight Spaceship",
        type: "static",
        updateCells: (target, dimX, dimY) => {
            for (let x = 0; x < dimX; x++) {
                for (let y = 0; y < dimY; y++) {
                    if (x === 2 && y === 1 || x === 2 && y === 8 || x === 2 && y === 15 || x === 2 && y === 22 || x === 2 && y === 29) {
                        for (let i = 0; i < 5; i++) {

                            for (let j = 0; j < 4; j++) {
                                if (i < 2 && j === 0) {
                                    target[i + x][j + y] = false;

                                } else if (i >= 2 && i < 4 && j === 0) {
                                    target[i + x][j + y] = true;

                                } else if (i < 2 && j === 1 || i > 2 && j === 1) {
                                    target[i + x][j + y] = true;

                                } else if (j === 2 && i < 4) {
                                    target[i + x][j + y] = true;
                                } else if (j === 3 && i > 0 && i < 3) {
                                    target[i + x][j + y] = true;
                                }

                            }

                        }
                    }

                }
            }
        }
    },
    svasticasPattern: {
        name: "Made by Reinaldo a.k.a Renato",
        type: "static",
        updateCells: (target, dimX, dimY) => {
            for (let x = 2; x < 18; x++) {
                for (let y = 2; y < 18; y++) {

                    if (x >= 2 && x <= 9 && y === 2 || y === 2 && x === 17) {
                        target[x][y] = true;
                    }

                    if (y >= 3 && y <= 8 && (x === 9 || x === 17)) {
                        target[x][y] = true;
                    }

                    if (y === 9) {
                        target[x][y] = true;
                    }

                    if (y >= 10 && y <= 15 && (x === 9 || x === 2)) {
                        target[x][y] = true;
                    }

                    if (x >= 9 && x <= 17 && y === 16 || y === 16 && x === 2) {
                        target[x][y] = true;
                    }

                }
            }
        }
    },
}

export default patterns;
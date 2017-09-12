export const CONFIG = {
    // socketServerUrl: 'http://172.16.1.159:8609',
    socketServerUrl: 'localhost:8609',
    heroes: {
        'death_king': {
            name: 'DEATH KING',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 6,
            stepLength: 10,
            sprite:{
                firstMovementFrameColumn: 7,
                topMove: {
                    row: 4
                },
                downMove: {
                    row: 1
                },
                leftMove: {
                    row: 2
                },
                rightMove: {
                    row: 3
                }
            },
            positionOnPlayGround: {
                positionOnPlayGroundY: 0,
                positionOnPlayGroundX: 0
            }
        },
        'death': {
            name: 'DEATH GHOST',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 6,
            stepLength: 20,
            sprite:{
                firstMovementFrameColumn: 10,
                topMove: {
                    row: 4
                },
                downMove: {
                    row: 1
                },
                leftMove: {
                    row: 2
                },
                rightMove: {
                    row: 3
                }
            },
            positionOnPlayGround: {
                positionOnPlayGroundY: 0,
                positionOnPlayGroundX: 0
            }
        },
        'blue_vampire': {
            name: 'BLUE VAMPIRE',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 5,
            stepLength: 3,
            sprite:{
                firstMovementFrameColumn: 4,
                topMove: {
                    row: 8
                },
                downMove: {
                    row: 5
                },
                leftMove: {
                    row: 6
                },
                rightMove: {
                    row: 7
                }
            },
            positionOnPlayGround: {
                positionOnPlayGroundY: 0,
                positionOnPlayGroundX: 0
            }
        },
        'viking': {
            name: 'VIKING',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 3,
            sprite:{
                firstMovementFrameColumn: 1,
                topMove: {
                    row: 8
                },
                downMove: {
                    row: 5
                },
                leftMove: {
                    row: 6
                },
                rightMove: {
                    row: 7
                }
            },
            positionOnPlayGround: {
                positionOnPlayGroundY: 0,
                positionOnPlayGroundX: 0
            }
        }
    }
};
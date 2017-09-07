export const CONFIG = {
    // socketServerUrl: 'http://172.16.1.159:8609'
    socketServerUrl: 'localhost:8609',
    heroes: {
        'death_king': {
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 5,
            stepLength: 5,
            sprite:{
                // firstMovementFrameColumn: 7,
                // topMove: {
                //     row: 8
                // },
                // downMove: {
                //     row: 5
                // },
                // leftMove: {
                //     row: 6
                // },
                // rightMove: {
                //     row: 7
                // }

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
            }
        }
    }
};
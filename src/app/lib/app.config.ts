export const CONFIG = {
    socketServerUrl: 'http://172.16.1.159:8609',
    // socketServerUrl: 'localhost:8609',
    heroes: {
        'death_king': {
            name: 'DEATH KING',
            description: 'Ну тут все просто - Король! Но бегает так себе, не совсем быро',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 200
            }
        },
        'death': {
            name: 'DEATH GHOST',
            description: 'Призрак, да. Летает как Шумахер',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 11,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 330
            }
        },
        'blue_vampire': {
            name: 'BLUE VAMPIRE',
            description: 'Голубенький вампирчик. Бегает и бегает',
            img_name: 'good_enemies_2.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 6,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 350
            }
        },
        'viking': {
            name: 'VIKING',
            description: 'Стары пердун. Этот вечно ручник снять забывает.( но быстрее рыцаря;) )',
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 400
            }
        },
        'mummy': {
            name: 'MYMIYA',
            description: 'Вроде и мумия какая-т, возможно даже самого тутахамона)',
            img_name: 'good_enemies_1.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 6,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 6,
            sprite:{
                firstMovementFrameColumn: 7,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 500
            }
        },
        'knight': {
            name: 'SUPER KNIGHT',
            description: 'Правильнее было бы не "Супер-Рыцарь", а "Супер-Медленный-Чел". Ничего кроме понтов.',
            img_name: 'good_enemies_3.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 1,
            sprite:{
                firstMovementFrameColumn: 1,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 50
            }
        },
        'girl_yellow': {
            name: 'DEUKA',
            description: 'Проста деука! куда ж без них! Ой, а хорошенькая какая!А бегает то как!',
            img_name: 'good_enemies_3.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 15,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 660
            }
        },
        'dark_one': {
            name: 'CHERNYAGA',
            description: 'Когда горячую воду отключили дольше чем на 2 недели...',
            img_name: 'good_enemies_4.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 8,
            sprite:{
                firstMovementFrameColumn: 10,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 700
            }
        },
        'mego_mosg': {
            name: 'MEGO-MOOOZG',
            description: 'Кто угадает кто это, тот молодец)))',
            img_name: 'good_enemies_6.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 4,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 75
            }
        },
        'ko_ko_ko': {
            name: 'Кура',
            description: 'Бегает што бешеная, честно.',
            img_name: 'good_enemies_7.png',
            oneFrameHeight: 32,
            oneFrameWidth: 32,
            movementFrames: 3,
            initPositionX: 0,
            initPositionY: 0,
            animationFrequency: 3,
            stepLength: 20,
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
                positionOnPlayGroundY: 20,
                positionOnPlayGroundX: 470
            }
        }
    }
};
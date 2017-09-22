
let checkIfHeroKillAnotherOne = (enemy, hero) => {

    let enemyTop = {
        left: {
            X: enemy.positionOnPlayGround.positionOnPlayGroundX,
            Y: enemy.positionOnPlayGround.positionOnPlayGroundY
        },
        right: {
            X: enemy.positionOnPlayGround.positionOnPlayGroundX + enemy.oneFrameWidth,
            Y: enemy.positionOnPlayGround.positionOnPlayGroundY
        }
    };

    let enemyBottom = {
       left: {
           X: enemy.positionOnPlayGround.positionOnPlayGroundX,
           Y: enemy.positionOnPlayGround.positionOnPlayGroundY + enemy.oneFrameHeight
       },
       right: {
           X: enemy.positionOnPlayGround.positionOnPlayGroundX + enemy.oneFrameWidth,
           Y: enemy.positionOnPlayGround.positionOnPlayGroundY + enemy.oneFrameHeight
       }
    };

    let heroTop = {
        left: {
            X: hero.positionOnPlayGround.positionOnPlayGroundX,
            Y: hero.positionOnPlayGround.positionOnPlayGroundY
        },
        right: {
            X: hero.positionOnPlayGround.positionOnPlayGroundX + hero.oneFrameWidth,
            Y: hero.positionOnPlayGround.positionOnPlayGroundY
        }
    };

    let heroBottom = {
        left: {
            X: hero.positionOnPlayGround.positionOnPlayGroundX,
            Y: hero.positionOnPlayGround.positionOnPlayGroundY + hero.oneFrameHeight
        },
        right: {
            X: hero.positionOnPlayGround.positionOnPlayGroundX + hero.oneFrameWidth,
            Y: hero.positionOnPlayGround.positionOnPlayGroundY + hero.oneFrameHeight
        }
    };

    if ( ((heroTop.left.Y <= enemyBottom.left.Y && heroTop.left.Y >= enemyTop.left.Y) ||
          (heroBottom.left.Y <= enemyBottom.left.Y && heroBottom.left.Y >= enemyTop.left.Y)) &&
         ((heroTop.left.X >= enemyBottom.left.X && heroTop.left.X <= enemyBottom.right.X) ||
          (heroTop.right.X >= enemyBottom.left.X && heroTop.left.X <= enemyBottom.right.X)) ) return true;

    return false;
};

module.exports = (server) => {

    const io = require("socket.io")(server);

    let heroes = {};
    let scores = [];

    io.on('connection', (socket) => {

        console.log('\n user connected \n');

        io.clients((err, clients) => { console.log('\n\n \n\n', clients, '\n\n\n') });

        socket.on('disconnect', subscriber => {
            console.log('\n User disconnected:  \n', socket.id, '\n\n\n');

            console.log('>>>> ', JSON.stringify(heroes, null, 4), '\n\n');
            
            Object.keys(heroes).forEach(key => {

                if (heroes[key].user.socketId == socket.id) {
                    console.log('\n>>>> ',heroes[key].user, '<<<>>>>\n', socket.id, '\n');
                    // this is the hero to remove from DOM
                    io.emit('remove-hero-element', {id: heroes[key].user.id});
                    delete heroes[key];
                }
            });

        });

        socket.on('save-message', (data) => { io.emit('new-message', {user: data.user, message: data.message}) });

        socket.on('create-hero', (playerData) => {

            console.log('\n\n>>>> hew hero here', playerData);

            // if hero was already added, no need to broadcast it to all players
            if (heroes[playerData.id] && !heroes[playerData.id].emitted) {
                console.log('\n\n111>>>> emit all');
                // broadcast to all subscribers if new hero appeared
                heroes[playerData.id].emitted = true;
                io.emit('receive-new-hero', { heroes: [heroes[playerData.id]] });
                if (scores.filter(score => score.playerName == playerData.name).length == 0) scores.push({id: playerData.id, playerName: playerData.name, value: 0});
            } else {
                console.log('\n\n222>>>> emit not all');
                // we should broadcast it only for current player(who refresh the page, for example)
                // in case we've restarted our server, all heroes data will be lost.
                socket.emit('scores-updated', scores);
                socket.emit('receive-new-hero', { heroes: heroes[playerData.id] ? [heroes[playerData.id]] : undefined });
            }
        });

        socket.on('get-all-heroes', (data) => {

            let allHeroesKeys = Object.keys(heroes);
            let result = [];

            allHeroesKeys.forEach(key => { if (heroes[key].user.id != data.id) result.push(heroes[key]) });

            // emit to current socket(current subscriber) only
            if (result.length > 0) socket.emit('receive-new-hero', {heroes: result});
        });

        socket.on('hero-action', (data) => {

            let heroPlayerData = heroes[data.heroPlayerData.user.id];

            io.emit('hero-acted', {eventCode: data.eventCode, heroPlayerData});
        });

        socket.on('hero-beat', (data) => {

            Object.keys(heroes).forEach(key => {

                if (heroes[key].user.id != data.user.id) {

                    if (checkIfHeroKillAnotherOne(heroes[key].hero, data.hero)) {

                        console.log(`${data.user.name}  killed ${heroes[key].user.name}\n`);

                        //remember hero position for blood location;
                        let bloodPosition = {
                            positionOnPlayGroundX: heroes[key].hero.positionOnPlayGround.positionOnPlayGroundX,
                            positionOnPlayGroundY: heroes[key].hero.positionOnPlayGround.positionOnPlayGroundY
                        };

                        //generate random hero spot location;
                        heroes[key].hero.positionOnPlayGround = {
                            positionOnPlayGroundX: Math.floor(Math.random() * (850 - 1) + 1),
                            positionOnPlayGroundY: Math.floor(Math.random() * (550 - 1) + 1)
                        };

                        io.emit('hero-was-killed', {heroPlayerData: heroes[key], blood: bloodPosition});

                        scores.forEach(score => {
                            if (score.playerName == data.user.name) score.value ++;
                        });

                        io.emit('scores-updated', scores);
                    }
                }
            });

        });

        socket.on('update-hero-data', data => { {

            // in case when user return to settings page during game session to avoid multiple heroes instances situation for one player;
            Object.keys(heroes).forEach(key => {
                if ((heroes[key].user.name == data.user.name) && (heroes[key].user.id != data.user.id)) {

                    // this is the hero to remove from DOM
                    io.emit('remove-hero-element', {id: heroes[key].user.id});
                    delete heroes[key];
                    return;
                }
            });

            // console.log('\n\n here we are to update data:\n ', JSON.stringify(data, null, 4), '\n >>>>', socket.id, '\n');

            if (!data.user.socketId) data.user.socketId = socket.id;
            heroes[data.user.id] = data

        } });
    });

    return (req, res, next) =>  next();
};
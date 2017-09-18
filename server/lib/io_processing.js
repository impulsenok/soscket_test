module.exports = (server) => {

    const io = require("socket.io")(server);

    let heroes = {};

    io.on('connection', (socket) => {

        console.log('\n user connected \n');

        io.clients((err, clients) => { console.log('\n\n \n\n', clients, '\n\n\n') });

        socket.on('disconnect', subscriber => console.log('\n User disconnected:  \n', subscriber, '\n\n\n'));

        socket.on('save-message', (data) => { io.emit('new-message', {user: data.user, message: data.message}) });

        socket.on('create-hero', (playerData) => {

            // if hero was already added, no need to broadcast it to all players
            if (heroes[playerData.id] && !heroes[playerData.id].emitted) {
                // broadcast to all subscribers if new hero appeared
                heroes[playerData.id].emitted = true;
                io.emit('receive-new-hero', { heroes: [heroes[playerData.id]] });
                // we should broadcast it only for current player(who refresh the page, for example)
            } else {
                socket.emit('receive-new-hero', { heroes: [heroes[playerData.id]] });
            }
        });

        socket.on('get-all-heroes', (data) => {

            let allHeroesKeys = Object.keys(heroes);
            let result = [];

            allHeroesKeys.forEach(key => { if (heroes[key].user.id != data.id) result.push(heroes[key]) });

            // emit to current socket(current subscriber) only
            socket.emit('receive-new-hero', {heroes: result})
        });

        socket.on('hero-action', (data) => {

            let heroPlayerData = heroes[data.heroPlayerData.user.id];

            io.emit('hero-acted', {eventCode: data.eventCode, heroPlayerData})
        });

        socket.on('hero-beat', (data) => {

            console.log('\n\n herod beat data>>> ', JSON.stringify(data, null, 4));
        });

        socket.on('update-hero-data', data => {
            console.log('\n\n\n ipdate hero data here: ', JSON.stringify(data, null, 4));
            heroes[data.user.id] = data
        });
    });

    return (req, res, next) =>  next();
};
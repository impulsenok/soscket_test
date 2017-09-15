const env            = process.env.NODE_ENV || 'development';
const express        = require('express');
const path           = require('path');
const config         = require('config');
const favicon        = require('serve-favicon');
const logger         = require('morgan');
const accessLog      = require('server/lib/log');
const bodyParser     = require('body-parser');

const Promise        = require('bluebird');
const extend         = require('extend');
const session        = require('express-session');
const userAgent      = require('express-useragent');
const redis          = Promise.promisifyAll(require('redis'));
const RedisStore     = require('connect-redis')(session);
const sessionStore   = new RedisStore(config.get('redis').session_store);
const sessionConfig  = extend(config.get('session'), {
    store: sessionStore,
    resave: true,
    saveUninitialized: true
});

const app = express();

const server         = require('http').Server(app);

const io             = require("socket.io")(server);

app.use(userAgent.express());

// ACCESS logging: redirect default express morgan to mainStream Logs method to write log to 'logs.access' log.
logger.token('normIp', (req) => {      // creating custom Tag to write source id(if exists)
    return req.get('x-forwarded-for') ? req.get('x-forwarded-for') : '<unknown ip>';
});
app.use(logger(':normIp - (:remote-addr) ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {stream: accessLog.loggers.mainStream}));

app.use(session(sessionConfig));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


let heroes = {};

io.on('connection', (socket) => {

    console.log('\n user connected \n');

    io.clients((err, clients) => { console.log('\n\n \n\n', clients, '\n\n\n') });

    socket.on('disconnect', subscriber => console.log('\n User disconnected:  \n', subscriber, '\n\n\n'));

    socket.on('save-message', (data) => { io.emit('new-message', {user: data.user, message: data.message}) });

    socket.on('create-hero', (playerData) => {

        if (heroes[playerData.id] && !heroes[playerData.id].emitted) {
            // broadcast to all subscribers if new hero appeared
            heroes[playerData.id].emitted = true;
            io.emit('receive-new-hero', { heroes: [heroes[playerData.id]] })
        } else {
            socket.emit('receive-new-hero', { heroes: [heroes[playerData.id]] })
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

    socket.on('update-hero-data', data => heroes[data.user.id] = data);
});


app.use('/', require('server/routes/index'));
app.use('/login', require('server/routes/login'));
app.use('/api', require('server/routes/api'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (env === 'development') {
    app.use((err, req, res, next) => res
        .status(err.status || 500)
        .send({error: err}));
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => res
    .status(err.status || 500)
    .send({error: err}));

app.set('port', process.env.PORT || config.get('port') || 3000);

// info
server.listen(app.get('port'), () => {
    if (env != 'production') console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;

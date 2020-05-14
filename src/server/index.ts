import * as express from 'express'
import { Request, Response } from 'express'
import * as path from 'path'

import { createServer } from 'http'
import * as socketio from 'socket.io'
import * as bodyParser from 'body-parser'

import { logger } from './util/logger'
import { onAuth, onSubscribe, onCreate, onLeave, rooms, onDisconnect } from './modules/socketEvents'
import * as passport from 'passport'

import { localSignup as localSignupStrategy } from './passport/local-signup'
import { localLogin as localLoginStrategy } from './passport/local-login'

import { router as authRoutes } from './routes/auth'

import { config } from 'dotenv'
import { onMessage } from './modules/room/chat/onMessage'

config({ path: path.join(__dirname, 'config.env') })

const app = express();
const {
  PORT = 3000
} = process.env;

const http = createServer(app)
const io = socketio(http, {
  serveClient: false
})


// TODO: input validation - max length's, etc
// TODO: room collision detection

// FIXME: major security vuln with client id handling - STOP HANDING THEM OUT
io.on('connection', (client) => {
  client.on('auth', (e) => { onAuth(io, client, e) })
  client.on('subscribeToRoom', (e) => { onSubscribe(io, client, e) });
  client.on('createRoom', (e) => { onCreate(io, client, e) })

  client.on('chatMsg', (e) => { onMessage(io, client, e) })

  client.on('leaveRoom', (e) => { onLeave(io, client, e) });
  client.on('disconnect', (e) => { onDisconnect(io, client, e) });
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

app.use(passport.initialize());
app.use(passport.session());

passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.use('/auth', authRoutes);

app.get('*client.js', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "client.js"))
})

app.get('/api/rooms', (req: any, res: any) => {
  res.json(rooms);
})

app.get('*', (req: Request, res: any) => {
  res.sendFile(publicPath + '/index.html')
});

if (require.main === module) {
  http.listen(PORT, () => {
    logger.info('Server started at http://localhost:' + PORT);
  });
}

export default app;
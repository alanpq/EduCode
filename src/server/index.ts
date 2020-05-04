import * as express from 'express'
import { Request, Response } from 'express'
import * as path from 'path'

import { createServer } from 'http'
import * as socketio from 'socket.io'
import { RoomConnectionOptions } from '../client/modules/Room'
import { ConnError } from '../modals/Errors'
import { IRoom } from './modals/IRoom'
import { generateName } from './util/name-gen'
//TODO: fix client side socket.io include

import { v4 as uuid } from 'uuid'

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

import * as winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') { // print log to console if not in prod
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const app = express();
const {
  PORT = 3000
} = process.env;

const http = createServer(app)
const io = socketio(http, {
  serveClient: false
})

const rooms: { [id: string]: IRoom } = {}; // TODO: figure out room data storage (probably with DB stuff)
const subscribed: { [connID: string]: string } = {};
// FIXME: major security vuln with client id handling - STOP HANDING THEM OUT
io.on('connection', (client) => {
  client.on('subscribeToRoom', (options: RoomConnectionOptions) => {
    console.log(`client wishes to subscribe to room ${options.roomID}`);
    if (rooms[options.roomID]) { // room exists
      console.log(`room found`)
      const room: IRoom = rooms[options.roomID];
      console.log(room.password, options.password)
      if (room.password == '' || room.password == options.password) {
        console.log(`password good`)
        if (room.connections.length < room.capacity) {
          console.log(`client subscribed to room ${options.roomID}`)
          if (room.host == undefined) rooms[options.roomID].host = client.id
          rooms[options.roomID].connections.push({ id: client.id, displayName: options.user?.displayName || generateName(2) })
          subscribed[client.id] = options.roomID
          client.join(options.roomID)
          io.to(options.roomID).emit('roomState', room)
          // client.emit('roomState', room)
        } else {
          console.log('room full')
          client.emit('err', ConnError.ROOM_MAX_CAPACITY)
        }
      } else {
        console.log('bad password')
        client.emit('err', ConnError.UNAUTHORIZED)
      }
    } else {
      console.log(`room not found`)
      client.emit('err', ConnError.ROOM_NOT_FOUND)
    }
  });

  client.on('createRoom', (options: IRoom) => {
    const id = uuid();
    rooms[id] = {
      id: id,
      capacity: options.capacity,
      name: options.name,
      password: options.password,
      connections: [],
      host: undefined,
    };
    client.emit('res', id)

  })

  client.on('disconnect', (reason) => {
    const roomID = subscribed[client.id];
    if (rooms[roomID]) {
      console.log('disconnect from ' + roomID)
      const room = rooms[roomID];
      console.log('room found')
      const a = room.connections;
      a.splice(a.findIndex((v, i, o) => { return v.id == roomID }));
      if (room.host == client.id) room.host = a[0]?.id;
      rooms[roomID] = room
      if (a.length == 0) { // room is empty
        setTimeout(() => {
          if (rooms[roomID].connections.length == 0)
            delete rooms[roomID];
        }, 5000); // delete room after 5 seconds
      } else {
        io.to(roomID).emit('roomState', room)
        // }
      }
    });
});


// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
const publicPath = path.join(__dirname, 'public')
app.use(express.static(publicPath))

app.get('*client.js', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "client.js"))
})

app.get('/api/rooms', (req: any, res: any) => {
  res.json(JSON.stringify(rooms));
})

app.get('*', (req: Request, res: any) => {
  res.sendFile(publicPath + '/index.html')
});

if (require.main === module) {
  http.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT);
  });
}

export default app;
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

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);



const app = express();
const {
  PORT = 3000
} = process.env;

const http = createServer(app)
const io = socketio(http, {
  serveClient: false
})

const rooms: { [id: string]: IRoom } = {}; // TODO: figure out room data storage (probably with DB stuff)

io.on('connection', (client) => {
  client.on('subscribeToRoom', (options: RoomConnectionOptions) => {
    console.log(`client wishes to subscribe to room ${options.roomID}`);
    const room: IRoom = rooms[options.roomID];
    if (room) { // room exists
      if (room.password == options.password) {
        if (room.connections.length < room.capacity) {
          console.log(`client subscribed to room ${options.roomID}`)
          rooms[options.roomID].connections.push({ id: client.id, displayName: options.user.displayName || generateName(2) })
        } else {
          client.emit('error', ConnError.ROOM_MAX_CAPACITY)
        }
      } else {
        client.emit('error', ConnError.UNAUTHORIZED)
      }
    } else {
      client.emit('error', ConnError.ROOM_NOT_FOUND)
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

app.get('*', (req: Request, res: any) => {
  res.sendFile(publicPath + '/index.html')
});

if (require.main === module) {
  http.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT);
  });
}

export default app;
import * as express from 'express'
import { Request, Response } from 'express'
import * as path from 'path'

import { createServer } from 'http'
import * as socketio from 'socket.io'

import { logger } from './util/logger'
import { onSubscribe, onCreate, onDisconnect, rooms } from './modules/roomEvents'

const app = express();
const {
  PORT = 3000
} = process.env;

const http = createServer(app)
const io = socketio(http, {
  serveClient: false
})


// FIXME: major security vuln with client id handling - STOP HANDING THEM OUT
io.on('connection', (client) => {
  client.on('subscribeToRoom', (e) => { onSubscribe(io, client, e) });
  client.on('createRoom', (e) => { onCreate(io, client, e) })

  client.on('disconnect', (e) => { onDisconnect(io, client, e) });
});


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
    logger.info('Server started at http://localhost:' + PORT);
  });
}

export default app;
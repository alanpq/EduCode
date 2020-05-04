import * as express from 'express'
import { Request, Response } from 'express'
import * as path from 'path'

import { createServer } from 'http'
import * as socketio from 'socket.io'

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);



const app = express();
const {
  PORT = 3000
} = process.env;

const http = createServer(app)
const io = socketio(http)

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
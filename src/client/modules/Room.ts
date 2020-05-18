import * as io from 'socket.io-client';
import { IRoom } from '../../server/modals/IRoom';
export const socket: SocketIO.Socket = io();

// TODO: client user interface
// TODO: put 'me' variable somewhere better
export var me: any = {};

socket.on('connect', () => {
  socket.emit('auth')
  socket.once('res', (user) => {
    me = user
    console.log('Got me: ', me)
  })
})


export interface RoomConnectionOptions {
  user: any, //TODO: define user type
  roomID: string,
  password: string,
}

export const subscribeToRoom = (options: RoomConnectionOptions, cb: any, err: any) => {
  // TODO: allow non-anonymous subscription
  socket.emit('subscribeToRoom', { user: options.user, roomID: options.roomID, password: options.password });
  socket.on('roomState', cb);

  socket.once('err', err);
}

export const createRoom = (options: IRoom) => {
  socket.emit('createRoom', options)
  return new Promise((resolve, reject) => {
    socket.once('res', resolve);
    socket.once('err', reject);
  });
}

export const leaveRoom = () => {
  socket.emit('leaveRoom')
}
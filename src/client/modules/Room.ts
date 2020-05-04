import * as io from 'socket.io-client';
const socket = io();

export interface RoomConnectionOptions {
  user: any, //TODO: define user type
  roomID: string,
  password: string,
}

export const subscribeToRoom = (options: RoomConnectionOptions, cb: any) => {
  socket.on('roomState', state => cb(state));
  socket.emit('subscribeToRoom', { user: options.user, roomID: options.roomID, pwd: options.password }); // subscribe anonymously
}
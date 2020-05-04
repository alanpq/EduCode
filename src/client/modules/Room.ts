import * as io from 'socket.io-client';
import { IRoom } from '../../server/modals/IRoom';
const socket = io();

export interface RoomConnectionOptions {
  user: any, //TODO: define user type
  roomID: string,
  password: string,
}

export const subscribeToRoom = (options: RoomConnectionOptions) => {
  socket.emit('subscribeToRoom', { user: options.user, roomID: options.roomID, pwd: options.password }); // subscribe anonymously
  return new Promise((resolve, reject) => {
    socket.once('roomState', resolve);
    socket.once('err', reject);
  })
}

export const createRoom = (options: IRoom) => {
  socket.emit('createRoom', options)
  return new Promise((resolve, reject) => {
    socket.once('res', resolve);
    socket.once('err', reject);
  });
}
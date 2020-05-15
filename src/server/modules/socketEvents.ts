
import { IRoom } from '../modals/IRoom'

import { onCreate } from './room/onCreate';
import { onLeave } from './room/onLeave';
import { onDisconnect } from './room/onDisconnect';
import { onSubscribe } from './room/onSubscribe';
import { onAuth } from './room/onAuth';

// TODO: move room data (integrate with DB)
export const rooms: { [id: string]: IRoom } = {};
export const subscribed: { [connID: string]: string } = {};

export const connectionIDs = {} // map of socket id to user id
export const connectedUser = {} // map of socket id to connected user (non anonymous users)

export { onAuth, onCreate, onLeave, onSubscribe, onDisconnect }
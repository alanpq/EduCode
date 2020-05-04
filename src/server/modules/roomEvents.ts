
import { IRoom } from '../modals/IRoom'

import { onCreate } from './room/onCreate';
import { onDisconnect } from './room/onDisconnect';
import { onSubscribe } from './room/onSubscribe';

// TODO: move room data (integrate with DB)
export const rooms: { [id: string]: IRoom } = {};
export const subscribed: { [connID: string]: string } = {};

export { onCreate, onDisconnect, onSubscribe }
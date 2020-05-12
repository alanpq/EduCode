import { v4 as uuid } from 'uuid'

import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'
import { IRoom } from '../../modals/IRoom';

import { rooms, subscribed, connectionIDs } from '../socketEvents'

export const onCreate = (io: SocketIO.Server, client: SocketIO.Socket, options: IRoom) => {
  const id = connectionIDs[client.id];
  if (!id) {
    logger.error("No-auth client attempting to create a room!")
    return client.emit('err', ConnError.UNAUTHORIZED)
  }
  const roomID = uuid();
  options.name = options.name.trim().substr(0, 30);
  if (!options.name) return; // TODO: return better response here
  options.password = options.password.substr(0, 30);
  options.capacity = Math.min(10, Math.max(2, options.capacity))
  logger.info(`Creating room '${options.name}' with pwd '${options.password}' @ size ${options.capacity}`)
  rooms[roomID] = {
    id: roomID,
    capacity: options.capacity,
    name: options.name,
    password: options.password,
    connections: [],
    host: undefined,
  };
  client.emit('res', roomID)
}
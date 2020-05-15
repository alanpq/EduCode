import { RoomConnectionOptions } from '../../../client/modules/Room';

import { generateName } from '../../util/name-gen'
import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'
import { IRoom } from '../../modals/IRoom';

import { rooms, subscribed, connectionIDs, connectedUser } from '../socketEvents'

export const onSubscribe = (io: SocketIO.Server, client: SocketIO.Socket, options: RoomConnectionOptions) => {
  const id = connectionIDs[client.id];
  if (!id) {
    logger.error("No-auth client attempting to subscribe to room!")
    return client.emit('err', ConnError.UNAUTHORIZED)
  }

  logger.info(`Client wishes to Subscribe to room '${options.roomID}'`);
  const room: IRoom = rooms[options.roomID];

  if (room === undefined)
    return client.emit('err', ConnError.ROOM_NOT_FOUND)
  // logger.info(room.password)
  // logger.info(options.password)
  if (room.password != '' && room.password != options.password)
    return client.emit('err', ConnError.ROOM_BAD_CRED)

  if (room.connections?.length >= room.capacity)
    return client.emit('err', ConnError.ROOM_MAX_CAPACITY)

  logger.info(`Client subscribed to room '${room.name}' (${options.roomID})`)

  if (room.host == undefined)
    rooms[options.roomID].host = id

  rooms[options.roomID].connections.push({
    id: id,
    displayName: connectedUser[client.id]?.username || generateName(2)
  })

  subscribed[id] = options.roomID

  client.join(options.roomID)
  io.to(options.roomID).emit('roomState', room)
}
import { v4 as uuid } from 'uuid'

import { RoomConnectionOptions } from '../../../client/modules/Room';

import { generateName } from '../../util/name-gen'
import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'
import { IRoom } from '../../modals/IRoom';

import { rooms, subscribed } from '../roomEvents'

export const onSubscribe = (io: SocketIO.Server, client: SocketIO.Socket, options: RoomConnectionOptions) => {
  logger.info(`Client wishes to Subscribe to room ${options.roomID}`);
  const room: IRoom = rooms[options.roomID];

  if (room === undefined)
    return client.emit('err', ConnError.ROOM_NOT_FOUND)
  logger.info(room.password)
  logger.info(options.password)
  if (room.password != '' && room.password != options.password)
    return client.emit('err', ConnError.UNAUTHORIZED)

  if (room.connections?.length >= room.capacity)
    return client.emit('err', ConnError.ROOM_MAX_CAPACITY)

  logger.info(`Client subscribed to room ${room.name} (${options.roomID})`)

  if (room.host == undefined)
    rooms[options.roomID].host = client.id

  rooms[options.roomID].connections.push({
    id: client.id,
    displayName: options.user?.displayName || generateName(2)
  })

  subscribed[client.id] = options.roomID

  client.join(options.roomID)
  io.to(options.roomID).emit('roomState', room)
}
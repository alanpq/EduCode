import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'

import { rooms, subscribed, connectionIDs } from '../socketEvents'
import { removeUserFromRoom } from './onLeave';

/**
 * Handler for SocketIO disconnect event 
 * @param io Reference to SocketIO Server
 * @param client Reference to SocketIO Client
 * @param reason Reason for disconnect
 */
export const onDisconnect = (io: SocketIO.Server, client: SocketIO.Socket, reason) => {
  const id = connectionIDs[client.id]
  // if (!id) {
  //   logger.error("No-auth client attempting to leave from room!")
  //   return client.emit('err', ConnError.UNAUTHORIZED)
  // }
  const roomID = subscribed[id]
  if (rooms[roomID]) { // user is in a room
    const room = rooms[roomID]
    if (removeUserFromRoom(id, room) > 0) {
      io.to(roomID).emit('roomState', room)
    }
  }

  logger.info(`Removing disconnected login '${id}'`)
  delete connectionIDs[client.id]
}
import { logger } from '../../../util/logger'
import { connectionIDs, subscribed, rooms } from '../../socketEvents'
import { ConnError } from '../../../../modals/Errors'
import { subscribeToRoom } from '../../../../client/modules/Room'

/**
 * 
 * @param io Reference to SocketIO Server
 * @param client Reference to SocketIO Client
 * @param msg Chat Message text
 */
export const onMessage = (io: SocketIO.Server, client: SocketIO.Socket, msg: string) => {
  const id = connectionIDs[client.id]
  if (!id) {
    logger.error("No-auth client attempting to send a chat message!")
    return client.emit('err', ConnError.UNAUTHORIZED)
  }
  const roomID = subscribed[id]
  if (!roomID) {
    logger.error("Client not in a room trying to send chat message!")
    return client.emit('err', ConnError.ROOM_NOT_FOUND)
  }
  if (!msg.trim()) return;
  msg = msg.trim().substr(0, 500)
  io.to(roomID).emit('chatMsg', { user: id, msg })
}
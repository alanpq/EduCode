import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'
import { IRoom } from '../../modals/IRoom';

import { rooms, subscribed, connectionIDs } from '../socketEvents'

/**
 * Removes user from a room.
 * @param user ID of user
 * @param room Room object
 * @returns # of users left in room.
 */
export const removeUserFromRoom = (userID: string, room: IRoom) => {

  logger.info(`Removing client ${userID} from ${room.name} (${room.id})`)
  const conns = room.connections;
  const idx = conns.findIndex((v, i, o) => { return v.id == userID });
  //TODO: investigate potential bug where room will not self-destruct from early return
  if (idx == -1) return logger.error('Client trying to leave room twice!')
  logger.info(`Removing idx ${idx}...`)
  conns.splice(idx, 1);
  delete subscribed[userID]

  if (room.host == userID) room.host = conns[0]?.id; // pass down host

  if (conns.length == 0) { // room is empty
    // create room destruction timer
    // FIXME: expected buggy behavior if user rejoins empty room before it's destroyed
    setTimeout(() => {
      if (rooms[room.id].connections.length == 0)
        delete rooms[room.id];
    }, 5000);

  }
  return conns.length
}

/**
 * Handler for a room leave event
 * @param io Reference to SocketIO Server
 * @param client Reference to SocketIO Socket
 * @param params Additional Params from client
 */
export const onLeave = (io: SocketIO.Server, client: SocketIO.Socket, params) => {
  const id = connectionIDs[client.id];
  if (!id) {
    logger.error("No-auth client attempting to leave from room!")
    return client.emit('err', ConnError.UNAUTHORIZED)
  }
  const roomID = subscribed[id];
  const room = rooms[roomID];
  if (!rooms[roomID]) return; // room not found
  if (removeUserFromRoom(id, room) > 0) {
    io.to(roomID).emit('roomState', room)
  }
}
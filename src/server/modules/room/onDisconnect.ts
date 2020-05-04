import { v4 as uuid } from 'uuid'

import { RoomConnectionOptions } from '../../../client/modules/Room';

import { generateName } from '../../util/name-gen'
import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'
import { IRoom } from '../../modals/IRoom';

import { rooms, subscribed } from '../roomEvents'

export const onDisconnect = (io: SocketIO.Server, client: SocketIO.Socket, reason) => {
  const roomID = subscribed[client.id];
  if (!rooms[roomID]) return; // room not found
  const room = rooms[roomID];

  logger.info(`Client disconnected from ${room.name} (${room.id})`)
  const conns = room.connections;
  const idx = conns.findIndex((v, i, o) => { return v.id == client.id });
  //TODO: investigate potential bug where room will not self-destruct
  if (idx == -1) return logger.error('Disconnecting client trying to leave room twice!')
  logger.info(`Removing idx ${idx}...`)
  conns.splice(idx, 1);

  if (room.host == client.id) room.host = conns[0]?.id;

  if (conns.length == 0) { // room is empty
    // create room destruction timer
    setTimeout(() => {
      if (rooms[roomID].connections.length == 0)
        delete rooms[roomID];
    }, 5000);

  } else {
    io.to(roomID).emit('roomState', room)
  }
}
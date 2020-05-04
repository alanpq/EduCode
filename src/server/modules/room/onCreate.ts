import { v4 as uuid } from 'uuid'

import { RoomConnectionOptions } from '../../../client/modules/Room';

import { generateName } from '../../util/name-gen'
import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'
import { IRoom } from '../../modals/IRoom';

import { rooms, subscribed } from '../roomEvents'

export const onCreate = (io: SocketIO.Server, client: SocketIO.Socket, options: IRoom) => {
  const id = uuid();
  rooms[id] = {
    id: id,
    capacity: options.capacity,
    name: options.name,
    password: options.password,
    connections: [],
    host: undefined,
  };
  client.emit('res', id)
}
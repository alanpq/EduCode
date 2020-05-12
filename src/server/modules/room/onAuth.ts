import { v4 as uuid } from 'uuid'

import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'

import { connectionIDs } from '../socketEvents'

export const onAuth = (io: SocketIO.Server, client: SocketIO.Socket, params: any) => {
  if (params?.token) { // ATTEMPTING LOGIN WITH TOKEN
    // TODO: implement token login
  } else {            // ANONYMOUS LOGIN
    const id = uuid();
    connectionIDs[client.id] = id
    logger.info(`Anonymous login assigned id '${id}'`)
    client.emit('res', { id })
  }
}
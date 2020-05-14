import { v4 as uuid } from 'uuid'

import { logger } from '../../util/logger'

import { ConnError } from '../../../modals/Errors'

import { connectionIDs, connectedUser } from '../socketEvents'
import { auth } from '../../middleware/auth-check'

// TODO: ensure no funky behavior when auth called twice
export const onAuth = (io: SocketIO.Server, client: SocketIO.Socket, token: any) => {
  if (token) { // ATTEMPTING LOGIN WITH TOKEN
    // TODO: implement token login
    logger.info(`User logging in with token: ${token}`) //TODO: remove me
    auth(token).then((user: any) => {
      const id = uuid();
      connectionIDs[client.id] = id
      connectedUser[client.id] = user
      client.emit('res', { id })
      console.log('winning: ' + id)
    }).catch((reason) => {
      console.error('Auth promise failed!')
      client.emit('error', reason)
    })
  } else {            // ANONYMOUS LOGIN
    const id = uuid();
    connectionIDs[client.id] = id
    logger.info(`Anonymous login assigned id '${id}'`)
    client.emit('res', { id })
  }
}
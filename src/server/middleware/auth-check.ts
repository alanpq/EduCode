import * as jwt from 'jsonwebtoken'
import { dbCollections } from '../modules/db';
import { logger } from '../util/logger';

export const auth = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET + '', (err, decoded) => {
      // the 401 code is for unauthorized status
      if (err)
        return reject(err)

      //TODO: have user db
      // req.user = {};
      // return next();
      const docID = decoded.sub

      dbCollections.users.doc(docID).get().then((snap) => {
        logger.info('auth success')
        resolve({ ...snap.data(), id: docID })
      }).catch(() => {
        logger.error("invalid login")
        reject('user not found')
      })
    });
  })
}

/**
 *  The Auth Checker middleware function.
 */
export const authWare = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  auth(token).then((user) => {
    req.user = user
    return next()
  }).catch(() => {
    return res.status(401).end()
  });
};
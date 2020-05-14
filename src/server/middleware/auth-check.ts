const config = require('../../config');

import * as jwt from 'jsonwebtoken'
import { dbCollections } from '../modules/db';
import { logger } from '../util/logger';


/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    //TODO: have user db
    // req.user = {};
    // return next();

    const docID = decoded.sub

    dbCollections.users.doc(docID).get().then((snap) => {
      logger.info('auth success')
      req.user = snap.data()
      return next()
    }).catch(() => {
      logger.error("invalid login")
      return res.status(401).end()
    })

    // check if a user exists
    // return User.findById(userId, (userErr, user) => {
    //   if (userErr || !user) {
    //     return res.status(401).end();
    //   }
    //   // pass user details onto next route
    //   req.user = user
    //   return next();
    // });
  });
};
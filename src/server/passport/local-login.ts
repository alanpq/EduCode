import * as jwt from 'jsonwebtoken'
import { Strategy as PLocalStrat, IVerifyOptions } from 'passport-local'

import { dbCollections } from '../modules/db'
import { logger } from '../util/logger'

import * as bcrypt from 'bcryptjs'

export const localLogin = new PLocalStrat({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req: any, usr, pwd, done) => {
  const userData = {
    username: usr.trim(),
    password: pwd.trim()
  }

  dbCollections.users.where("username", "==", req.body.username).get().then(async (snap) => {
    switch (snap.docs.length) {
      case 0:
        let err = new Error('Incorrect username/password')
        err.name = 'InvalidCredentialsError'
        return done(err)
        break;
      case 1:
        const user = snap.docs[0].data()
        const payload = {
          sub: snap.docs[0].id
        };

        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) {
          const err = new Error("Incorrect username/password!")
          err.name = "InvalidCredentialsError"
          return done(err)
        }
        // hide sensitive info
        delete user.password

        // create a token string
        //TODO: handle jwt secret
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        return done(null, token, user as unknown as IVerifyOptions)
        break;
      default:
        logger.error(`Duplicate username found!`)
        snap.docs.forEach((doc) => {
          logger.error("- ", JSON.stringify(doc.data()))
        })
        err = new Error('Server Error finding user')
        err.name = 'ServerError'
        return done(err)
        break;
    }
  }).catch((err) => {
    logger.error('User DB search unknown error:')
    logger.error(err)
  })
})
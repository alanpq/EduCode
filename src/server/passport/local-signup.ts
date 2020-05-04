import { Strategy as PLocalStrat } from 'passport-local'
import { dbCollections } from '../modules/db'
import * as bcrypt from 'bcryptjs'
import { logger } from '../util/logger';

export const saltRounds = 10;

export const localSignup = new PLocalStrat({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, usr, pwd, done) => {
  const userData = {
    username: usr.trim(),
    password: pwd.trim(),
    email: req.body.email.trim(),
  }

  dbCollections.users.where("username", "==", userData.username).get().then(function (snap) {
    if (snap.docs.length == 0) {
      bcrypt.hash(userData.password, saltRounds).then(function (hash) {
        logger.info('Hash:')
        logger.info(hash)
        userData.password = hash
        dbCollections.users.add(userData)
      }).catch((e) => {
        logger.error(e)
        return done(e);
      });


      return done(null);
    } else {
      const err = new Error("Username Taken!")
      err.name = "CredentialsCollision"
      return done(err)
    }
  }).catch((e) => {
    logger.error(e)
    return done(e);
  })
})
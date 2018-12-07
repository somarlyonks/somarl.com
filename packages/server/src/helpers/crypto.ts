
import { pbkdf2Sync } from 'crypto'

import { SETTINGS } from '../settings'


export function phkdf2Password (password: S) {
  return pbkdf2Sync(password, SETTINGS.USER_PASSWORD_SALT, 10, 32, 'sha512').toString('base64')
}

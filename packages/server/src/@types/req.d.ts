import * as express from 'express'
import { User } from '../graphql'

declare global {
  interface IJwtPayload {
    id: User['id']
  }
}

declare module 'express' {
  interface Request {
    user?: User
  }
}

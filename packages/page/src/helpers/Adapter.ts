export {
  HTTPStatusCodes,
  WeatherTypes, weatherTypeMap, IWeatherResponse,
  IBinksRecord,
  named,
  compose,
  randomString,
  isPromise,
} from '@somarl.com/pipe'


import {
  User,
} from '@somarl.com/pipe'


export type IUser = Pick<User, 'id'
                             | 'created'
                             | 'nickname'
                             | 'email'
                             | 'lastseen'
                             | 'avatar'>

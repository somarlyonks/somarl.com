
import { IRepo } from '../../arango'
import { Has } from './models'


export interface IHasRepo extends IRepo<Has> {
  //
}

export interface IEdgeService {
  has (from: S, to: S): P<Has>
}

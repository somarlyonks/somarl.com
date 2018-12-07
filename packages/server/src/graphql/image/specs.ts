import { IRepo } from '../../arango'
import { Image } from './models'
import { NewImageInput } from './dto/input'
import { ImagesArgs } from './dto/args'


export interface IImageRepo extends IRepo<Image> {
  //
}


export interface IImageService {
  create (data: NewImageInput): P<Image>
  findOneById (id: S): P<DehydratedDocument<Image> | void>
  findAll (args: ImagesArgs): P<L<Image>>
  removeById (id: S): P<boolean>
}

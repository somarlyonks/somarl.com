import { ArgsType } from '@nestjs/graphql'
import { ListArgs } from '../../shared'

@ArgsType()
export class ImagesArgs extends ListArgs {
  // TODO: @sy filter by user
}

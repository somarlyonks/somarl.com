
import { ArgsType } from '@nestjs/graphql'
import { ListArgs } from '../../shared'

@ArgsType()
export class DocumentArgs extends ListArgs {
  // TODO: @sy filter by user
}


import { ArgsType } from '@nestjs/graphql'
import { ListArgs } from '../../shared'

@ArgsType()
export class DoctypesArgs extends ListArgs {
  // TODO: @sy filter by user
}

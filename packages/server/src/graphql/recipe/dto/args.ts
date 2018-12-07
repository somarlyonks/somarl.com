import { ArgsType } from '@nestjs/graphql'
import { ListArgs } from '../../shared'

@ArgsType()
export class RecipesArgs extends ListArgs {
}

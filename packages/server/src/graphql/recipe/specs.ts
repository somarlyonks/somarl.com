import { IRepo } from '../../arango'
import { Recipe } from './models'
import { NewRecipeInput } from './dto/input'
import { RecipesArgs } from './dto/args'


export interface IRecipeRepo extends IRepo<Recipe> {
  //
}


export interface IRecipeService {
  create (data: NewRecipeInput): P<Recipe>
  findOneById (id: S): P<DehydratedDocument<Recipe> | void>
  findAll (args: RecipesArgs): P<L<Recipe>>
  removeById (id: S): P<boolean>
}

import { Field, ObjectType } from 'type-graphql'
import { Model } from '../shared'


@ObjectType()
export class Recipe extends Model {
  @Field(type => String)
  public title!: S

  @Field({ nullable: true })
  public description?: S

  @Field(type => [String])
  public ingredients!: L<S>
}

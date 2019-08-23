import { Field, ObjectType, ID } from 'type-graphql'
import { IModel } from '../shared'


@ObjectType()
export class Recipe implements IModel {
  @Field(type => ID)
  public id!: S

  @Field()
  public created!: Date

  @Field(type => String)
  public title!: S

  @Field({ nullable: true })
  public description?: S

  @Field(type => [String])
  public ingredients!: L<S>
}

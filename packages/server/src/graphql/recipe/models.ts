import { Field, ID, ObjectType } from 'type-graphql'


@ObjectType()
export class Recipe {
  @Field(type => ID)
  public id!: S

  @Field(type => String)
  public title!: S

  @Field({ nullable: true })
  public description?: S

  @Field()
  public created!: Date

  @Field(type => [String])
  public ingredients!: L<S>
}

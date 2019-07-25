import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Recipe {
  @Field(type => ID)
  public id!: string

  @Field()
  public title!: string

  @Field({ nullable: true })
  public description?: string

  @Field()
  public creationDate!: Date

  @Field(type => [String])
  public ingredients!: string[]
}

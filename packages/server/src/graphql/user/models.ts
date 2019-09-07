import { Field, ObjectType, ID } from 'type-graphql'
import { IModel } from '../shared'


@ObjectType()
export class User implements IModel {
  @Field(type => ID)
  public id!: S

  @Field()
  public created!: Date

  @Field(type => String)
  public nickname!: S

  @Field(type => String)
  public email!: S

  @Field(type => String)
  public password!: S

  /** access to logs */
  @Field(type => Number)
  public accessLevel!: N

  /** @description the image key */
  @Field(type => String)
  public avatar!: S
}

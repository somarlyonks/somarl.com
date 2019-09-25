import { Field, ObjectType, Int } from 'type-graphql'
import { Model } from '../shared'


@ObjectType()
export class User extends Model {
  @Field()
  public nickname!: S

  @Field()
  public email!: S

  @Field()
  public lastseen?: Date

  @Field()
  public password!: S

  /** access to logs */
  @Field(type => Int)
  public accessLevel!: N

  /** @description the image key */
  @Field()
  public avatar!: S
}

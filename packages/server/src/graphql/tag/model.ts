import { Field, ObjectType } from 'type-graphql'
import { Model } from '../shared'


@ObjectType()
export default class Tag extends Model {
  @Field(type => String)
  public name!: S

  @Field({ nullable: true })
  public description?: S

  @Field(type => String)
  public color!: S

  @Field(type => String)
  public image?: S

  @Field(type => [String])
  public images?: L<S>

  @Field(type => [String])
  public permissions!: L<S>
}

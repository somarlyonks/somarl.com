import { Field, ObjectType } from 'type-graphql'
import { Model } from '../shared'


@ObjectType()
export class Image extends Model {
  @Field()
  public key!: S

  @Field()
  public name!: S

  @Field()
  public url!: S

  @Field({ nullable: true })
  public imageInfo?: S
}

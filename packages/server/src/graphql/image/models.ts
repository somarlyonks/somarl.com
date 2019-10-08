import { Field, ObjectType } from 'type-graphql'
import { Model, JSONScalarType } from '../shared'


@ObjectType()
export class Image extends Model {
  @Field()
  public key!: S

  @Field()
  public name!: S

  @Field()
  public url!: S

  @Field(type => JSONScalarType, { nullable: true })
  public imageInfo?: S | {
    width: N,
    height: N
  } & O
}

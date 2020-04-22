import { Field, ObjectType } from '@nestjs/graphql'
import { Model, JSONScalarType } from '../shared'


@ObjectType()
export class Document <TSchema extends O = {}> extends Model {
  @Field()
  public name!: S

  @Field({ nullable: true })
  public description?: S

  @Field()
  public image?: S

  @Field(type => JSONScalarType)
  public data?: TSchema
}


@ObjectType()
export class History <TSchema extends O = {}> extends Model {
  @Field()
  public version!: N

  @Field(type => JSONScalarType)
  public data!: Document<TSchema>
}

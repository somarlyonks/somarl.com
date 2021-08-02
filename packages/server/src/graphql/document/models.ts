import { Field, ObjectType } from '@nestjs/graphql'
import { Model, JSONScalarType } from '../shared'


@ObjectType()
export class Document <TSchema extends O = {}> extends Model {
  @Field()
  public name!: S

  @Field({nullable: true})
  public description?: S

  @Field()
  public image?: S

  @Field({nullable: true})
  public content?: S

  @Field(type => JSONScalarType)
  public meta?: TSchema
}


@ObjectType()
export class Version <TSchema extends O = {}> extends Model {
  @Field()
  public number!: N

  @Field(type => JSONScalarType)
  public data!: Document<TSchema>
}

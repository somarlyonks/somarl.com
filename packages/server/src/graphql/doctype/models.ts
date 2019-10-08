import { Field, ObjectType } from 'type-graphql'
import { Model, JSONScalarType } from '../shared'


@ObjectType()
export class Doctype <TSchema extends O = {}> extends Model {
  @Field()
  public name!: S

  @Field({ nullable: true })
  public description?: S

  @Field()
  public image!: S

  @Field(type => JSONScalarType)
  public schema!: TSchema // TODO: @sy schema type transformer

  @Field(type => [String])
  public permissions!: L<S>
}


import { Field, ObjectType } from '@nestjs/graphql'
import { Model, JSONScalarType, ISchema } from '../shared'


@ObjectType()
export class Doctype <TSchema extends ISchema = {}> extends Model {
  @Field()
  public name!: S

  @Field({ nullable: true })
  public description?: S

  @Field()
  public image!: S

  @Field(type => JSONScalarType)
  public schema!: TSchema
}

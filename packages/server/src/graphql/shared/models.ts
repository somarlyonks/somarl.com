import { ObjectType, Field, ID } from 'type-graphql'

import { IModel, IRelation } from './interfaces'


@ObjectType({implements: IModel, isAbstract: true})
export abstract class Model implements IModel {
  @Field(type => ID)
  public id!: S

  @Field()
  public created!: Date
}


@ObjectType({implements: IRelation, isAbstract: true})
export abstract class Relation implements IRelation {
  @Field(type => ID)
  public id!: S

  @Field()
  public created!: Date

  @Field()
  public from!: S

  @Field()
  public to!: S
}

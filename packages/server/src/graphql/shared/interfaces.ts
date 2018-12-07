import { InterfaceType, Field, ID } from '@nestjs/graphql'

import { IModel as IAbsModel, IRelation as IAbsRelation } from './specs'


@InterfaceType()
export abstract class IModel implements IAbsModel {
  @Field(type => ID)
  public id!: S

  @Field()
  public created!: Date
}


@InterfaceType()
export abstract class IRelation implements IAbsRelation {
  @Field(type => ID)
  public id!: S

  @Field()
  public created!: Date

  @Field(type => ID)
  public from!: S

  @Field(type => ID)
  public to!: S
}

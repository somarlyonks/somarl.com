
import { Field, ObjectType } from '@nestjs/graphql'
import { Relation } from '../shared'


@ObjectType()
export class Has extends Relation {
  //
}


type ILogEvent = 'Create'
               | 'View'
               | 'Tag'
               | 'Update'
               | 'Delete'

@ObjectType()
export class Log extends Relation {
  @Field(type => String)
  public event!: ILogEvent

  @Field(type => Number)
  public level!: N
}


@ObjectType()
export class History extends Relation {
  //
}

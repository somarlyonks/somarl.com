import { Field, ObjectType } from '@nestjs/graphql'
import { Relation } from '../shared'


/**
 * @description User -> Has -> Document
 *              User -> Has -> Tag
 *              Tag -> Has -> Tag
 *              Tag -> Has -> Document
 *              Document -> Has -> History
 * @todo split
 */
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

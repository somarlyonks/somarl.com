// tslint:disable: no-magic-numbers

import { IsOptional, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'


@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  public nickname!: S

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  public password?: S
}

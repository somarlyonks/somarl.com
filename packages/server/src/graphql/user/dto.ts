// tslint:disable: no-magic-numbers

import { IsOptional, MaxLength, IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'


@InputType()
export class NewUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  public nickname?: S

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(30)
  public email?: S

  @Field()
  @MaxLength(255)
  public password!: S
}

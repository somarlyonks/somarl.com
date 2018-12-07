// tslint:disable: no-magic-numbers

import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, MaxLength, IsEmail } from 'class-validator'


@InputType()
export class NewUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  public nickname?: S

  @Field()
  @IsEmail()
  @MaxLength(30)
  public email!: S

  @Field()
  @MaxLength(255)
  public password!: S
}

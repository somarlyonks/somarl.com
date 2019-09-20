// tslint:disable: no-magic-numbers

import { IsOptional, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'


@InputType()
export class NewImageInput {
  @Field()
  @MaxLength(30)
  public key!: S

  @Field()
  @MaxLength(30)
  public name!: S

  @Field()
  @MaxLength(255)
  public url!: S

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(1023)
  public imageInfo?: S
}

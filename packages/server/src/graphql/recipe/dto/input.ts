// tslint:disable: no-magic-numbers

import { IsOptional, Length, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'


@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  public title!: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  public description?: string

  @Field(type => [String])
  public ingredients!: string[]
}

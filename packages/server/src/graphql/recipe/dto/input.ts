// tslint:disable: no-magic-numbers

import { IsOptional, MaxLength } from 'class-validator'
import { Field, InputType } from 'type-graphql'


@InputType()
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  public title!: S

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  public description?: S

  @Field(type => [String])
  public ingredients!: L<S>
}

// tslint:disable: no-magic-numbers

import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
import { JSONScalarType } from '../../shared'


@InputType()
export class NewDoctypeInput {
  @Field()
  @MaxLength(30)
  public name!: S

  @Field()
  public image!: S

  @Field(type => JSONScalarType)
  public schema!: A
}

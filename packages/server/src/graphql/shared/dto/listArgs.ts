import { ArgsType, Field, Int } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'


@ArgsType()
export class ListArgs {
  @Field(type => Int)
  @Min(0)
  public skip: N = 0

  @Field(type => Int)
  @Min(1)
  @Max(50)
  public take: N = 10
}

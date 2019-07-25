import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind } from 'graphql'


@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date> {
  public description = 'Date custom scalar type'

  public parseValue (value: number): Date {
    return new Date(value) // value from the client
  }

  public serialize (value: Date): number {
    return value.getTime() // value sent to the client
  }

  public parseLiteral (ast: any): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    // tslint:disable-next-line: no-null-keyword
    return new Date(0)
  }
}

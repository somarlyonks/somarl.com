import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'


@Scalar('DateString', type => Date)
export class DateScalar implements CustomScalar<S, Date> {
  public description = 'Date custom scalar type'

  /** value from the client input variables */
  public parseValue (value: S): Date {
    return new Date(value) // value from the client
  }

  /**
   * value sent to the client
   * @example 2020-09-24T13:30:32.302
   */
  public serialize (value: S): S {
    return (new Date(value)).toISOString()
  }

  /** value from the client query */
  public parseLiteral (ast: ValueNode): Date {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return new Date(ast.value)
    }

    throw new Error('Failed to parse gql query with scalar date')
  }
}

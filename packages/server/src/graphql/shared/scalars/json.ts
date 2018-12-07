import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ValueNode, ObjectValueNode, GraphQLScalarType } from 'graphql'


function parseObject (ast: ObjectValueNode): O {
  return ast.fields.reduce((r, f) => Object.assign(r, {
    [f.name.value]: parseAst(f.value),
  }), {})
}


function parseAst (ast: ValueNode): A {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value

    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value)

    case Kind.OBJECT:
      return parseObject(ast)

    case Kind.LIST:
      return ast.values.map(parseAst)

    default:
      throw new Error(`Not sure what to do with ${ast.kind} for JSONScalar.`)
  }
}

const ScalarConfig = {
  name: 'JSON',
  description: 'JSON custom scalar type',
  parseValue (value: S | O): O {
    if (typeof value === 'string') return JSON.parse(value)
    return value
  },
  serialize (value: S | O): O {
    if (typeof value === 'string') return JSON.parse(value)
    return value
  },
  parseLiteral (ast: ValueNode): O {
    if (ast.kind === Kind.STRING) return JSON.parse(ast.value)
    if (ast.kind === Kind.OBJECT) return parseObject(ast)

    throw new Error(`Not sure what to do with ${ast.kind} for JSONScalar.`)
  },
}


@Scalar(ScalarConfig.name, type => Object)
export class JSONScalar implements CustomScalar<O | S, O> {
  public description = ScalarConfig.description

  public parseValue (value: S | O): O {
    return ScalarConfig.parseValue(value)
  }

  public serialize (value: S | O): O {
    return ScalarConfig.serialize(value)
  }

  public parseLiteral (ast: ValueNode): O {
    return ScalarConfig.parseLiteral(ast)
  }
}

export const JSONScalarType = new GraphQLScalarType(ScalarConfig)

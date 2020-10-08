export interface IModel {
  id: S
  created: Date
}

export interface IRelation extends IModel { // TODO: @sy resolved relation
  from: S
  to: S
}

type META_FIELD_TYPES = 'text'
                      | 'rating'
                      | 'number'
                      | 'time'
                      | 'datetime'
                      | 'image'
                      | 'url'
                      | 'location'
                      | 'boolean'
                      | 'ref'

type FIELD_PRIMITIVE_TYPES = 'string' | 'number' | 'boolean'

interface IField {
  type: FIELD_PRIMITIVE_TYPES
  default: A
  help: S
}

type IFields = Record<META_FIELD_TYPES, IField>

export type ISchema = Record<S, IField>


const META_FIELDS: IFields = {
  text: {
    type: 'string',
    default: '',
    help: '',
  },
  rating: {
    type: 'number',
    default: 0,
    help: '',
  },
  number: {
    type: 'number',
    default: 0,
    help: '',
  },
  time: {
    type: 'string',
    default: '00:00',
    help: '09:00[:00[.000]]',
  },
  datetime: {
    type: 'string',
    default: '1970',
    help: '2020[-10[-01[T09:00[:00[.000]]]]]',
  },
  image: {
    type: 'string',
    default: '', // TODO: @sy default image
    help: 'key',
  },
  url: {
    type: 'string',
    default: 'https://somarl.com',
    help: 'url',
  },
  location: {
    type: 'string',
    default: '121.560331,25.040008',
    help: '121.560331,25.040008',
  },
  boolean: {
    type: 'boolean',
    default: true,
    help: '',
  },
  ref: {
    type: 'string',
    default: '',
    help: '_/sdqwEWsdd',
  },
}

export function makeSchema (schema: {
  [k: string]: {
    type: META_FIELD_TYPES,
    default?: S
    help?: S
  }
}): ISchema {
  return Object.fromEntries(Object.entries(schema).map(([k, v]) => [k, {
    ...META_FIELDS[v.type],
    ...v,
    type: META_FIELDS[v.type].type,
  }]))
}

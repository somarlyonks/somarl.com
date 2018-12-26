# Plan

Functions to implement in schedule.

## Common guide

```json
schema: {
  FUNCTION: [{
    option: optionName,
    param?: paramValue,
    default?: param,
    short?: shortOptionName
  }]
}
```

SYNOPSIS: `FUNCTION [options]`

OPTION: `--optionName=paramValue` or `-shortOptionName paramValue`(if any)

## blogs

```json
blogs: [
  {
    option: 'page':
    param: number,
    default: 1,
    short: 'P'
  },
  {
    option: 'pagesize',
    param: number,
    default: 5
  },
  {
    option: 'orderby',
    param: '/[\+\-]/',
    default: '-'
  },
  {
    option: 'offset',
    param: number,
    default: (page - 1) * pagesize,
    short: 'O'
  },
  {
    option: 'limit',
    param: number,
    default: pagesize,
    short: 'L'
  },
  {
    option: 'from',
    param: date,
    default: 1/1/1970,
    short: 'F'
  },
  {
    option: 'to',
    param: date,
    default: present,
    short: 'T'
  }
]
```

### default

- page = 1
- pagesize = 5
- limit = 5
- offset = (page - 1) * 5

## RSS

## SSH*

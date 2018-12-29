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

SYNOPSIS: `FUNCTION [options] [file]`

OPTION: `--optionName=paramValue` or `-shortOptionName paramValue`(if any)

## blogs

```json
blogs: [
  {
    option: 'page':
    param: number,
    default: 1,
    short: 'p'
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
    short: 'o'
  },
  {
    option: 'limit',
    param: number,
    default: pagesize,
    short: 'l'
  },
  {
    option: 'from',
    param: date,
    default: 1/1/1970,
    short: 'f'
  },
  {
    option: 'to',
    param: date,
    default: present,
    short: 't'
  }
]
```

### default

- page = 1
- pagesize = 5
- limit = 5
- offset = (page - 1) * 5
- orderby = '-'

### auth

My personal port, login with pin, enable posting blogs online.

## RSS

Subscribe/unsubscribe source functions.

## Weather

Shown at the top-left of the page, click to toggle. Or get specific weather informations by input queries with the terminal.

Options: based on Api.

Default: get weather infomation from public Api based on environemnt viarable.(Why not IP? because sometimes i use proxies.)

## SSH*

## Customized defualt content of right panel

1. On default, it loads nothing but the latest background image
2. When terminal input is clicked at first time, show the output window

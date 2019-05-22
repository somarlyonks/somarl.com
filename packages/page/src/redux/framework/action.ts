// tslint:disable-next-line: no-magic-numbers
const randomString = () => Math.random().toString(36).substring(7).split('').join('.')

// inner actions
export const ActionTypes = {
  INIT: `@@redux/INIT${randomString()}`,
  REPLACE: `@@redux/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`,
}

export function bindActionCreators () {}

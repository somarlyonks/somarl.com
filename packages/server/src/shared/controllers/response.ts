function handleError (error: Error) {
  return error // TODO: @sy implement thisk
}

export abstract class JSONResp {

  public static success (payload: O = {}) {
    return {
      ...payload,
      error: '',
    }
  }

  public static error (error: Error, payload: O = {}) {
    return {
      ...payload,
      error: handleError(error),
    }
  }

}

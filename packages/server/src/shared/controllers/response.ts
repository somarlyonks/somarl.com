function handleError (error: Error) {
  return error // TODO: @sy implement thisk
}

export abstract class JSONResp {

  public static success <TPayload extends O = {}> (payload?: TPayload) {
    return {
      ...payload,
      error: '',
    } as TPayload & {error: S}
  }

  public static error <TPayload extends O = {}> (error: Error, payload?: TPayload) {
    return {
      ...payload,
      error: handleError(error),
    } as TPayload & {error: A}
  }

}

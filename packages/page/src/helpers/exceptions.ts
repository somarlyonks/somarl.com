export function iOError (error: Error) {
  return {
    status: 0,
    body: {
      error, // TODO: apply to the global error process
    },
  }
}

export type ErrorData = {
    message: string
    code?: number
  }
  
export type ErrorProps = {
    code?: number
  } & (
    | { message: string; errors?: never }
    | { message?: never; errors: ErrorData[] }
  )
  
class RequestError extends Error {
    code?: number
    errors: ErrorData[]
  
    constructor({ message, code, errors }: ErrorProps) {
      const error: ErrorData = message
        ? { message, ...(code ? { code } : {}) }
        : errors![0]
  
      super(error.message)
      this.errors = message ? [error] : errors!
  
      if (error.code) this.code = error.code
    }
  }

export default RequestError;
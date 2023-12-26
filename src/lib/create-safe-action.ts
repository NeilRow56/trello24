import { z } from 'zod'

// generic actions
//FieldErrors comes from zod validation
// K "Key" can be string number or symbol
// K in keyof T = "Key in the Type of T. T is Type paramter. In the case below it is an object field that contains the errors and this will produce an array of strings. Each string will be an individual error"

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>
  error?: string | null
  data?: TOutput
}

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data)
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      }
    }

    return handler(validationResult.data)
  }
}

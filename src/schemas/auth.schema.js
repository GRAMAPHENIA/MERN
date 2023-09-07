import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Usuario requerido  👤'
  }),
  email: z
    .string({
      required_error: 'Se requiere del email  📧'
    })
    .email({
      message: 'Email invalido  ❌'
    }),
  password: z
    .string({
      required_error: 'Se requiere el password  🔑'
    })
    .min(6, {
      message: 'El password debe tener al menos 6 caracteres'
    })
})

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Se requiere del email  📧'
    })
    .email({
      message: 'Email invalido  ❌'
    }),
  password: z
    .string({
      required_error: 'Se requiere el password  🔑'
    })
    .min(6, {
      message: 'El password debe tener al menos 6 caracteres'
    })
})

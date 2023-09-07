import { z } from 'zod'

// Vamos a crear un objeto de zod y lo vamos exportar en una constante llamada createTaskSchema.

export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'El título es requerido 🫵'
  }),
  description: z.string({
    required_error: 'La descripción debe ser una cadena de texto ⛓️ '
  }),
  date: z.string().datetime().optional()
})

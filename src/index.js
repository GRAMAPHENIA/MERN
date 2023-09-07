import app from './app.js'
import { connectDB } from './db.js'

// inicia la coneccion
connectDB()

// inicia el servidor
app.listen(3000)
console.log('🪴  El servidor escucha en el puerto', 3000, '🪴')

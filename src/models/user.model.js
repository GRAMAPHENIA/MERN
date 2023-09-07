import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  // Con esto decimos que es lo que se va a guardar
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps:true
})

// Con esto interactuamos con la base de datos; con los metodos.
export default mongoose.model('User', userSchema)

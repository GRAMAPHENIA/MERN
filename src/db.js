import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dicoratojuanpablo:zASSHI1HfdkRoKt8@cluster0.6cvochr.mongodb.net/"
    );
    console.log('🕹️  Base de datos conectada 🕹️')
  } catch (error) {
    console.log(error)
  }
}

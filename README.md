# CREACION DE LA APLICACION

creamos carpeta _src_ en la raiz del proyecto

npm init -y

npm i express
se crea `app.js` en la carpeta _src_

```
import express from 'express'

const app = express()

app.listen(3000)
console.log('El servidor escucha', 3000)
```

añdimos en el `package.json` debajo de main `"type": "module",`
esto se hace para decir que queremos que se usen los modulos de `ECMAScript`

creamos las carpetas

dentro de `src` creamos `routes` para crear las URL's del backend. Todos lo endpoint que el frontend puede pedir.

tambien dentro de `src` creamos `controllers` para crear funciones que se ejecuten cuando visitamos las _URL's_

continuamos dentro de`src` creando `models` para guardar los modelos de datos de las bases de datos. (_eschemas_).

luego `middlewares` sirven para decir que rutas estan protegidas por usuarios autenticados

pasamos a crear `schemas` (_usando la biblioteca_ `ZOD`) es para validar los datos cuando lleguen al backend.

por ultimo creamos `libs` para escribir codigo que podamos reimportar varias veces. Como ejemplo una funcion para generar tokens wue se puedan usar tanto en el login como en el register.

Siguiendo dentro de `src` creamos los archivos `db.js` (_basicamente la coneccion a la base de datos_), `config.js` (_configuraciones para que el resto de archivos pueda importar ej:puertos o variables_ (SECRET). Configuraciones globales), `index.js`(_relacionado con el arranque da la aplicacion_)

Instalar el modulo `nodemon` `npm i nodemon -D` (_este modulo sirve para que cada vez que hacemos un canmbio, se reinicia el servidor y no tenemos que hacerlo nosotros de manera manual_)

En el package.json en la seccion de `scripts` borramos lo que hay y colocamos `"dev": "nodemon src/index.js"` _(npm run dev)_

Instalamos un modulo que sirve para ver las peticiones que van llegando al backend llamado `Morgan` con `npm i morgan`. Este lo importamos en el app

# BASE DE DATOS

Instalamos el modulo de `Mongoose` (_nos permite conectarnos a mongodb y tambien modelar los datos_) `npm i mongoose`

En `db.js` importamos mongoose

```
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/merndb')
    console.log('🕹️  Base de datos conectada 🕹️')
  } catch (error) {
    console.log(error)
  }
}
```

En la carpeta models creamos el archivo `user.model.js`. Un modelo es una forma de especificarle a _MongoDb_ que es lo que vamos a estar guardando, creando una estructura fija.

En este archivo importamos mongoose y de el utilisamos su `Schema`.

```
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
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
})

// Con esto interactuamos con la base de datos; con los metodos.
export default mongoose.model('User', userSchema)


```

# REGISTRO DE USUARIOS

Dentro de la carpeta _routes_ creamos un archivo para englobar todas las rutas relacionadas con autenticacion (_login, register, perfil, etc_)
Creamos el archivo `auth.routes.js`. Dentro de este importamos Router de express (`import { Router } from "express";`)

Dentro de la carpeta _controllers_ creamos un nuevo archivo llamado `auth.controller.js` el cual va a tener una funcion para `auth.routes.js`

```
export const register = (req, res) => {}

export const login = (req, res) => {}

```

Una vez creado lo importamos en `auth.controller.js`

`import { login, register } from '../controllers/auth.controller'`

Importamos en el app.js `authRoutes`
`import authRoutes from './routes/auth.routes.js'`

# CREACION DE TOKEN

### 🔑 _ENCRIPTANDO LA CONTRASEÑA_

Instalamos un nuevo modulo de nodes _bcryptjs_.
`npm i bcryptjs`

lo importamos en _auth.controllers.js_

### MODULO TOKEN

Instalamos el modulo _json web token_

`npm i jsonwebtoken`

Lo importamos dentro de _auth.controller.js_

`import Jwt from 'jsonwebtoken'`

Dentro de la carpeta libs. creamos un archivo llamado `jwt.js` y colocamos la siguiente funcion

```
import  Jwt  from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export function createAccessToken (payload) {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
```

en `config.js` creamos el **TOKEN_SECRET**
y lo importamos en `jwt.js`

# CREACION DE LOGIN

```
// login
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res
        .status(400)
        .json({
          message: ' El usuario no a sido encontrado en la base de datos'
        })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) { return res.status(400).json({ message: 'Contraseña incorrecta' }) }

    const token = await createAccessToken({ id: userFound._id })

    res.cookie('token', token)

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


```

### Agregando funcion de logout

creamos una nueva ruta en `auth.routes.js`
`router.post('./logout', logout)`

```
// Agregando LogOut

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

```

# VALIDACION DE TOKEN

creamos una nueva ruta en `auth.routes.js`
`router.get('/profile', profile)`

Creamos una nueva funcion en `auth.controller.js`

```

// creando profile

export const profile = (req, res) => {
  res.send('profile')
}

```

### MIDDLEWARES

Dentro de la carpeta _middlewares_ creamos un nuevo archivo llamado:

`validateToken.js`

Se crea dentro de la carpeta _middlewares_ ya que es una funcion que se ejecuta antes de llegar a una ruta.

```

export const authRequired = (req, res, next) => {

}

```

`importamos en auth.routes y lo ejecutamos antes de profile`

`import { authRequired } from '../middlewares/validateToken.js'`

router.get('/profile', `authRequired`, profile)

### Instalamos un modulo nuevo para leer las cookies

`npm i cookie-parser`

esto nos agrega un middleware que hace que cada vz que hay una cooki este nos la combierte en un objeto JSON.

Importamos en `app.js`

`import cookieParser from 'cookie-parser'`

Creamos dentro de la carpeta _routes_ el archivo de nombre `tasks.routes.js`
dentro importamos `Router` y `authRequires`

en _app.js_ importamos desde `'./routes/tasks.routes.js'` `taskRoutes`

# TASKS CRUD

Se actualiza el archivo `task.routes.js`
dentro de la carpeta _controllers_ creamos el archivo `tasks.controller.js` dentro:

```
export const getTasks = async (req, res) => {}

export const createTask = async (req, res) => {}

export const getTask = async (req, res) => {}

export const updateTask = async (req, res) => {}

export const deleteTask = async (req, res) => {}

```

`importamos en  tasks.routes.js`

```
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.controller.js'

```

Dentro de la carpeta models creamos el modelo de tareas

dentro de `tasks.controller.js` importamos el modelo...

```

// CRUD COMPLETO

import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
}

export const createTask = async (req, res) => {
  const { title, description, date } = req.body

  const newTask = new Task({
    title,
    description,
    date
  })
  const savedTask = await newTask.save()
  res.json(savedTask)
}

export const getTask = async (req, res) => {
  const task = await Task.findById(req, params.id)
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
  res.json(task)
}

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req, params.id)
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
  res.json(task)
}

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req, params.id, req.body, {
    new: true
  })
  if (!task) return res.status(404).json({ message: 'Tarea no encontrada' })
  res.json(task)
}

```

# VALIDACION DE DATOS

instalamos el modulo ZOD con `npm i zod`

dentro de la carpeta _schemas_ creamos el archivo `auth.schema.js` . En el caso de estar utilizando TypeScript finaliza con la extencio `ts`

dentro de la carpeta _middlewares_ creamos un nuevo archivo `validator.middleware.js`

dentro de la carpeta _schemas_ creamos un nuevo archivo `task.schema.js`

# CONFIGURACION DEL LADO DEL CLIENTE

## Para commenzar

`npm create vite`

`cd client`

`npm install`

`npm run dev`

**_Abrimos una consola para el `frontend`_**

mientras que una lavanta el puerto `http://localhost:5173/`

**_Abrimos otra consola para el `backend`_**

el otro levanta el puerto `http://localhost:3000/`

# INSTALAMOS CORS

### Esto se hace para evitarce el error de cors(leer mas al respecto)

`npm install cors` y lo importamos en `app.js`




#

# CONTINUAMOS EN EL README DEL LADO DEL CLIENTE

#
`npm install cors`

# COMPLETO
import { Schema, model } from "mongoose";

// new Schema crea un nuevo esquema de datos para poder guardarlos en mi base de datos en mongoDB
// este esquema lo guardo en una constante que seria mi variable llamada taskSchema asi puedo despues relacionarla
//con mi modelo que seria el nombre que le voy a dar a mi esquema de datos

const taskSchema = new Schema(
  {
    title: {
      type: String, // tipode formato que espero
      required: true, // que el campo es requerido si o si
      unique: true, //me sirve  para que el campo sea unico , si existe este campo me da error para cambiar el nombre de lo ingresado por que ya existe
      trim: true, // elimina todos los espacios no necesarios
    },
    description: {
      type: String,
      required: true, // que sea requerido
    },
    done: {
      type: Boolean, // dato de tipo booleano verdadero o falso
      default: false, // para que caundo una tarea exista por default este en falso
    },
  },
  {
    timestamps: true,
    versionKey: false, // es para que nombodb no le agregue una version a mis tareas o datos (__v: 0) con esta propiedad me aseguro de que esto no aparesca
  }
);

export default model("Task", taskSchema); // le doy nombre al modelo y lo exporto para poderlo utilizar

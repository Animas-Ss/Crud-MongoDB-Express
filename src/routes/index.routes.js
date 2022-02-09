import { Router } from "express"; // esta linea es igual a escribir const router = requiere('Router');

import {
  createTask,//funcion importada desde el archivo task.controller.js en la carpeta de controladores donde estan todas als funciones de cada ruta
  deleteTask,
  editTask,
  renderTask,
  renderTaskEdit,
  toggleTaskDone,
} from "../controllers/task.controller";

const router = Router(); // como es una funcion ahi que ejecutarla (Router()) y guardar el objeto que nos devuelve en una constante llamada router
// una vez iniciada podemos utilizarla

router.get("/", renderTask); // renderizar la pagina principal

router.post("/tasks/add", createTask); // agregar una tarea

router.get("/tasks/:id/toggleDone", toggleTaskDone); // cambia el estado de una tarea false, true

router.get("/tasks/:id/edit", renderTaskEdit); // renderiza la pagina para editar una tarea

router.post("/tasks/:id/edit", editTask); // actualiza la tarea antes editada para que sea agurdada en la base de datos

router.get("/tasks/:id/delete", deleteTask); // elimina una tarea

export default router; // para exportar el archivo y poderlo utilizar en mi index

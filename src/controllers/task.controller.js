// este archivo esta destinado a realizar las funciones que luego iran a las rutas (routes/index.routes.js)
// las tutas estan relacionadas con las mis modelo (models/task.js) de datos que se gaurdan en la base de datos que cree
// luego este modelo de datos interactua con las vistas (views) , ya sea para carga , eliminacion, actualizacion ,etc

import Task from "../models/Task"; // importamos nuestro esquema y modelo de dato que elavoramos en mongoose para la guarda de datos

export const renderTask = async (req, res) => {
  const tasks = await Task.find().lean(); // la propiedad lean() de mongoose nos permite devolver un objeto tipico de JavaScript
  // find busca todas nuestras colecciones ne mongodb guardamos esto en una costante para despues poder usarlo
  res.render("index", { tasks: tasks });
};

export const createTask = async (req, res) => {
  // como para guardar los datos toma tiempo ya que requiere una coneccion con els ervidor
  // usamos el metodo async , await . que nos permite realizar una tarea despues de cargar otra
  try {
    const task = Task(req.body);
    await task.save(); // esta funsion que viene de este objeto nos permite aniadir a mongodb los datos la misma la guardamos en una constantepero esta funcion es asincrona
    res.redirect("/"); // me redirecciona a la ruta que yo desida en este caso es a la pagina principal
  } catch (error) {
    console.log(error);
  }
};

export const renderTaskEdit = async (req, res) => {
  try {
    console.log(req.params.id); // este req.params.id nos devuelve el id de la tarea
    const task = await Task.findById(req.params.id).lean(); // con esta funcion de mongosse buscamos la tarea por su ID en nuestra base de datos
    res.render("edit", { task: task }); // le paso una propiedad con nombre task y esta resive el valor los datos que consulte
  } catch (error) {
    console.log(error.message);
  }
};

export const editTask = async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);
  const { id } = req.params; // desetructuracion para poder simplemente usar la id en vez de usar req.params.id
  await Task.findByIdAndUpdate(id, req.body); // findByIdAndUpdate es una funcion de mongoose que nos permite actualizar una tarea en nuestra base de datos
  // esta es una funcion asincrona por lo cual requiere un await y en su funcion el async
  res.redirect("/"); // nos redirecciona a la direccion que nosotros pongamos en medio de parentesis y comillas
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);

  res.redirect("/");
};

export const toggleTaskDone = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  task.done = !task.done;

  await task.save();

  console.log(task);

  res.redirect("/");
};

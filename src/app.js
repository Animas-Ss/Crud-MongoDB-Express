import express from "express"; // esta linea es igual a poner const express = requiere('express');
// utilizando babel nos permite escribir esta nueva forma para crear el servidor
//sin necesidad de usar la sintaxis de express y node.js

import { create } from "express-handlebars"; // para importar el motor de plantillas handlebars que nos permite manejar html desde el servidor
import indexRoutes from "./routes/index.routes"; // estoy importando el archivo de rutas creado con su respectiva direccion

import path from "path";
import morgan from "morgan";// middlewares me permite saber las respuestas de el servidor con tiempo y estado 

const app = express(); // como es una funcion ahi que inicializarla y guardamos lo que nos devuelve quee s un objeto en una constante

app.set("views", path.join(__dirname, "views")); // para encontrar una ruta absoluta el petodo path nos permite hacer esta operacion multiplataforma
// desta forma __dirname se concatena con la carpeta vistas(views)y encuentra nuestro archivo
// __dirname es la direccion absoluta de nuestro proyecto ejemplo C:/archivos/usuarios/etc. hasta llegar al archivo solicitado

const exphbs = create ({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
});
//guardamos en una constante con el nombre exphbs el objeto que desectructuramos de handelbars llamado create
// y configuramos las direcciones de las carpetas que contienen nuestros archivos 
//tambien configuramos para que nuestra aplicaion pueda leer las extenciones .hbs 

app.engine(".hbs", exphbs.engine);// asignamos lo antes configurado a la funcion o sintaxis que viene de express llamado (engine)
app.set("view engine", ".hbs");//

//middlewares

app.use(morgan('dev'));//
app.use(express.urlencoded({ extended: false }));//

//Routes
app.use(indexRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

export default app;

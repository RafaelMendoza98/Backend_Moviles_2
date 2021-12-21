// Cargue la conexcion del grupo MySQL
const { request, response } = require("express");
const pool = require("../data/config");

// RUta de la app
const router = (app) => {
  // Mostrar mensaje de bienvenida de root
  app.get("/", (request, response) => {
    response.send({
      message: "Bienvenido ",
    });
  });

  //Mopstrar todos los usuarios
  app.get("/usuarios", (request, response) => {
    pool.query("SELECT * FROM usuarios", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get("/juegos", (request, response) => {
    pool.query("SELECT * FROM juegos", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get("/compras", (request, response) => {
    pool.query("SELECT * FROM compras", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.get("/carrito", (request, response) => {
    pool.query("SELECT * FROM carrito", (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });
///////////////////////////////////////////////////////////////////////////
  // Mostrar un solo usuatio por ID
  app.post("/users/log", (request, response) => {
    //const id = request.params.id;
    const nombre = request.params.nombre;
    const email = request.params.email;
    const password= request.params.password;

    pool.query("INSERT INTO usuarios set ?", request.body, (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  app.post("/compras/log", (request, response) => {
    //const id = request.params.id;
    const nombre = request.params.nombre;
    const descripcion = request.params.descripcion;
    const precio = request.params.precio;

    pool.query("INSERT INTO compras SET ?" , request.body, (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

  //Agregar un nuevo usuario
  app.post("/users", (request, response) => {
    pool.query("INSERT INTO usuarios SET ?", request.body, (error, result) => {
      if (error) throw error;

      response.status(200).send(`User added with ID: ${result.insertId}`);
    });
  });

  app.post("/car", (request, response) => {
    pool.query("INSERT INTO carrito SET ?", request.body, (error, result) => {
      if (error) throw error;

      response.status(200).send(`User added with ID: ${result.insertId}`);
    });
  });


  ///////////////////////////////////////////////////////////////////////////////
  //eliminar

  app.post("/eliminacar", (request, response) => {
    const nombrecar = request.params.nombre
    pool.query("DELATE FROM carrito SET ?",request.body, (error, result) => {
      if (error) throw error;

      response.status(200).send(`carrito eliminado: ${result.insertId}`);
    });
  });
};

// Exportar el router
module.exports = router;

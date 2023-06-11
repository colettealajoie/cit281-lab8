// #1 TODO: Declare fastify object from fastify, and execute
const fastify = require('fastify')();

// #2 TODO: Declare fetch object from node-fetch
const fetch = require('node-fetch');




fastify.get("/photos", (request, reply) => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving photos');
      }
    })
    .then(photos => {
      reply
        .code(200)
        .header("Content-Type", "application/json")
        .send({ error: "", statusCode: 200, photos: photos });
    })
    .catch(error => {
      reply
        .code(404)
        .header("Content-Type", "application/json")
        .send({ error: error.message, statusCode: 404, photos: [] });
    });
});

  
fastify.get("/photos/:id", (request, reply) => {
  const { id = "" } = request.params;

  fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Invalid Photo ID");
      }
    })
    .then(photo => {
      if (Object.keys(photo).length === 0) {
        reply.code(404).send({ error: "Invalid Photo ID", statusCode: 404 });
      } else {
        reply.code(200).send({ error: "", statusCode: 200, photo });
      }
    })
    .catch(error => {
      reply.code(404).send({ error: error.message, statusCode: 404 });
    });
});

  
  // Start server and listen to requests using Fastify
  const listenIP = "localhost";
  const listenPort = 8080;
  fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
  });

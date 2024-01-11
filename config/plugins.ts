module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: ["http://127.0.0.1:3000"],
    },
  },
  io: {
    enabled: true,
    config: {
      contentTypes: ["http://localhost:3000/"],
      events: [
        {
          name: "connection",
          handler: ({ strapi }, socket) => {
            // will log every time a client connects
            strapi.log.info(
              `[io] a new client with id ${socket.id} has connected`
            );
            socket.on("client-message", async (messageData) => {
              strapi.$io.emit("server-message", messageData);
            });
          },
        },
      ],
    },
  },
  socket: {
    serverOptions: {
      cors: { origin: "http://127.0.0.1:3000", methods: ["GET", "POST"] },
    },
  },
});

const amqplib = require("amqplib/callback_api");

// default url for rabbitmq // http://localhost:15672

amqplib.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  console.log("connected to rabbitmq");
  connection.createChannel((err, channel) => {
    if (err) throw err;
    const queueName = "Demo";
    const message = "this is my first message on rabbitmq";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.sendToQueue(queueName, Buffer.from(message));
    console.log("message:", message);

    setTimeout(() => {
      connection.close();
    }, 1000);
  });
});

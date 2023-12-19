const amqplib = require("amqplib/callback_api");

amqplib.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;
  connection.createChannel((err, channel) => {
    if (err) throw err;
    const queueName = "Demo";
    channel.assertQueue(queueName, {
      durable: false,
    });

    channel.consume(
      queueName,
      (msg) => {
        console.log("receive:", msg.content.toString());
        // channel.ack(msg); // acknowledgement for particular message
      },
      {
        noAck: true,
      }
    );
  });
});

import ampq from "amqplib";

export const connectRabbitMQ = async () => {
  try {
    const connection = await ampq.connect({
      protocol: "amqp",
      hostname: process.env.Rabbitmq_HOST,
      port: Number(process.env.Rabbitmq_PORT),
      username: process.env.Rabbitmq_USERNAME,
      password: process.env.Rabbitmq_PASSWORD,
    });

    console.log("✅ RabbitMQ connected");
    return await connection.createChannel();
  } catch (error) {
    console.log("❌ Failed to connect to rabbitmq", error);
  }
};

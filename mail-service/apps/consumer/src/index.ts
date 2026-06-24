import { connectRabbitMQ } from "./connection";

async function receiveMessages() {
  const channel = await connectRabbitMQ();
  if (!channel) {
    console.log("❌ RabbitMQ channel is not initialized");
    return;
  }

  const queue = "email_queue";
  await channel.assertQueue(queue, { durable: true });

  console.log("➡️ Waiting for messages...");
  channel.consume(
    queue,
    async (msg) => {
      if (msg !== null) {
        console.log(`📧 Raw message: ${msg.content.toString()}`);
        try {
          channel.ack(msg);
        } catch (error) {
          console.error("❌ Error processing message:", error);
          // Optionally nack the message or send to DLQ
          channel.nack(msg, false, false);
        }
      }
    },
    {
      noAck: false,
    },
  );
}

receiveMessages().catch(console.error);

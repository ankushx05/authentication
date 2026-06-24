import { connectRabbitMQ } from "./connection";

async function sendMessage() {
  const channel = await connectRabbitMQ();
  if (!channel) {
    console.log("❌ RabbitMQ channel is not initialized");
    return;
  }

  const queue = "email_queue";
  await channel.assertQueue(queue, { durable: true });

  for (let i = 0; i < 100; i++) {
    const message = {
      id: i,
      userName: "ankush",
      otp: 123456,
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`✅ Sent ${i}: ${JSON.stringify(message)}`);
  }
}

sendMessage().catch((error) => {
  console.error("❌ Error sending Email:", error);
});

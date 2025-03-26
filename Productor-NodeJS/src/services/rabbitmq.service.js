const amqp = require("amqplib");

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://admin:123456@rabbitmq:5672";
const QUEUE_NAME = "libros";

async function publishToQueue(mensaje) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(mensaje)), {
            persistent: true,
        });

        console.log("📨 Mensaje enviado a RabbitMQ:", mensaje);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("❌ Error publicando en RabbitMQ:", error);
    }
}

module.exports = { publishToQueue };

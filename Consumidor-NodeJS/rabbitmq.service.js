const amqp = require("amqplib");
require("dotenv").config();

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = process.env.QUEUE_NAME;

async function consumeMessages() {
    try {
        // Conexión a RabbitMQ
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        // Asegurar que la cola existe
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log(`✅ Esperando mensajes en la cola: ${QUEUE_NAME}`);

        // Consumir mensajes
        channel.consume(QUEUE_NAME, (msg) => {
            if (msg !== null) {
                const messageContent = msg.content.toString();
                console.log(`📥 Mensaje recibido: ${messageContent}`);

                // Confirmar el mensaje como recibido
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error("🚨 Error al consumir mensajes:", error);
    }
}

module.exports = { consumeMessages };

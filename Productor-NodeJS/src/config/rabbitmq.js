const amqp = require("amqplib");
require("dotenv").config();

const RABBITMQ_URL = `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;
const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const ROUTING_KEY = process.env.UPDATE_ROUTING_KEY;

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

        console.log("📡 Conectado a RabbitMQ");
        return { connection, channel };
    } catch (error) {
        console.error("🚨 Error al conectar a RabbitMQ:", error);
        process.exit(1);
    }
}

module.exports = { connectRabbitMQ, EXCHANGE_NAME, ROUTING_KEY };

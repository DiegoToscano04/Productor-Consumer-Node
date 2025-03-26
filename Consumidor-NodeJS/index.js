const { consumeMessages } = require("./rabbitmq.service");

console.log("📡 Iniciando consumidor de RabbitMQ...");

consumeMessages();
